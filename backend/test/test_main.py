import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_create_and_get_tasks():
    # Ensure empty at start
    r = client.get("/tasks")
    assert r.status_code == 200
    assert r.json() == []

    # Create a task
    r = client.post("/tasks", json={"title": "Test"})
    assert r.status_code == 200
    data = r.json()
    assert data["title"] == "Test"
    assert not data["completed"]

    # Get tasks now returns one
    r = client.get("/tasks")
    assert len(r.json()) == 1


def test_update_and_delete_task():
    # Create
    r = client.post("/tasks", json={"title": "To Update"})
    tid = r.json()["id"]

    # Update
    r = client.put(f"/tasks/{tid}", json={"title": "Updated", "completed": True})
    assert r.status_code == 200
    assert r.json()["completed"]

    # Delete
    r = client.delete(f"/tasks/{tid}")
    assert r.status_code == 200
    assert r.json()["detail"] == "Task deleted"
