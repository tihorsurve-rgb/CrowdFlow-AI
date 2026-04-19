from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
import asyncio
import random

app = FastAPI(title="CrowdFlow AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Mock Database ---
mock_db = {
    "zones": [
        {"id": "zone-a", "name": "North Gate", "density": 45, "wait_time_minutes": 5, "status": "normal"},
        {"id": "zone-b", "name": "Concession B (Drinks)", "density": 85, "wait_time_minutes": 15, "status": "congested"},
        {"id": "zone-c", "name": "East Washrooms", "density": 20, "wait_time_minutes": 2, "status": "normal"},
        {"id": "zone-d", "name": "Main Entrance", "density": 60, "wait_time_minutes": 8, "status": "normal"},
    ],
    "alerts": [
        {"id": 1, "zone_id": "zone-b", "message": "High congestion at Concession B", "severity": "high"}
    ]
}

# --- Pydantic Models ---
class RecommendationRequest(BaseModel):
    zone_id: str

# --- Endpoints ---

@app.get("/api/zones")
async def get_zones():
    """Returns all venue zones with their current crowd density and queue lengths."""
    return {"zones": mock_db["zones"]}


@app.get("/api/queues")
async def get_queues():
    """Returns queue time data specific to concessions and gates."""
    # Simplified mock filter
    queues = [{"name": z["name"], "wait_time": z["wait_time_minutes"]} for z in mock_db["zones"]]
    return {"queues": queues}


@app.get("/api/alerts")

@app.get("/api/route")
async def get_route():
    """
    Returns a smart route suggestion based on current mock zone conditions.
    """
    zones = mock_db["zones"]

    congested_zone = next((z for z in zones if z["status"] == "congested"), None)

    candidate_zones = [
        z for z in zones
        if z["status"] == "normal"
    ]

    if not candidate_zones:
        raise HTTPException(status_code=404, detail="No alternative zone available")

    best_zone = min(candidate_zones, key=lambda z: z["wait_time_minutes"])

    from_zone_name = congested_zone["name"] if congested_zone else "Current Zone"

    return {
        "from_zone": from_zone_name,
        "to_zone": best_zone["name"],
        "eta_minutes": 2,
        "path": ["You", "Corridor A", "Gate B", best_zone["name"]],
        "steps": [
            f"Move away from {from_zone_name}",
            "Use Corridor A to avoid crowd build-up",
            "Follow signage near Gate B",
            f"Reach {best_zone['name']} in about 2 minutes"
        ]
    }
async def get_alerts():
    """Returns active alerts for operations staff and users."""
    return {"alerts": mock_db["alerts"]}


@app.post("/api/recommendations")
async def get_ai_recommendation(req: RecommendationRequest):
    """
    Mock Gemini integration: Takes a congested zone and returns an AI-generated staff recommendation.
    """
    zone = next((z for z in mock_db["zones"] if z["id"] == req.zone_id), None)
    if not zone:
        raise HTTPException(status_code=404, detail="Zone not found")
        
    # In a real app, this prompts the Gemini API. For the MVP scaffold, we mock the AI response.
    mock_responses = [
        f"Deploy 2 rapid-response staff to {zone['name']} to manage the queue line.",
        f"Temporarily route incoming attendees from {zone['name']} to Zone C.",
        f"Open 2 additional registers at {zone['name']} and send a push alert to fans."
    ]
    
    return {
        "status": "success",
        "zone_name": zone["name"],
        "recommendation": random.choice(mock_responses)
    }

# Mock background simulator thread would go here, updating mock_db periodically
