def test_health(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_flights(client):
    response = client.get("/flights")
    assert response.status_code == 200
    assert len(response.json()) == 4

def test_metrics(client):
    response = client.get("/metrics")
    assert response.status_code == 200
    assert response.json() == {
        "total_flights": 4,
        "status_counts": {"arrived": 2, "cancelled": 1, "scheduled": 1}
    }

def test_status_arrived(client):
    response = client.get("/flights?status=arrived")
    body = response.json()
    assert response.status_code == 200
    assert len(body) == 2
    assert all(f["status"] == "arrived" for f in body)

def test_status_invalid(client):
    response = client.get("/flights?status=banana")
    assert response.status_code == 422