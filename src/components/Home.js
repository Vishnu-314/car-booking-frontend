import React, { useState, useEffect } from 'react';
import "./styles/home.css"

function Home() {
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [districts, setDistricts] = useState([]);

  // fetch the list of states from the backend on component mount
  useEffect(() => {
    fetch('/api/states')
      .then(response => response.json())
      .then(data => {
        // update the state with the list of states
        setState(data.states[0]);
      })
      .catch(error => console.log(error));
  }, []);

  // fetch the list of districts for the selected state when the state changes
  useEffect(() => {
    if (state) {
      fetch(`/api/districts/${state}`)
        .then(response => response.json())
        .then(data => {
          // update the state with the list of districts
          setDistricts(data.districts);
          setDistrict(data.districts[0]);
        })
        .catch(error => console.log(error));
    }
  }, [state]);

  // fetch the list of cars for the selected state and district when the district changes
  useEffect(() => {
    if (state && district) {
      fetch(`/api/cars/${state}/${district}`)
        .then(response => response.json())
        .then(data => {
          // update the state with the list of cars
          setCars(data.cars);
        })
        .catch(error => console.log(error));
    }
  }, [state, district]);

  return (
    <div>
      <p className='text-light fs-2'> Welcome to V-Car-Booking 
        please clink on Book-Slot</p>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Book Slot
      </button>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Select Location</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div className="mb-3">
                <label htmlFor="state" className="form-label">State</label>
                <select className="form-select" id="state" value={state} onChange={(event) => setState(event.target.value)}>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="district" className="form-label">District</label>
                <select className="form-select" id="district" value={district} onChange={(event) => setDistrict(event.target.value)}>
                  {districts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Continue</button>
      </div>
    </div>
  </div>
</div>
        </div>
    )
}

export default Home
