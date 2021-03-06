import React, { useState, useEffect } from "react";
import "./addEvent.css";

// This function is for displaying event info on selected date based on user info.
//Needs to be updated when we have auth for users
function AddEvent(props) {
  const [eventInfo, setEventInfo] = useState(null);
  const [eventDate, setEventDate] = useState(null);
  const [eventId, setEventId] = useState(null)
  const [eventName, setEventName] = useState(null)
  const [eventDescription, setEventDescription] = useState(null)
  const [eventStartTime, setEventStartTime] = useState(null)
  const [eventEndTime, setEventEndTime] = useState(null)


  let objectId = localStorage.getItem("id");
  

  useEffect(() => {
    console.log('In Add Event: ', props.location.state);

  }, []);

  function handleSubmit(evt) {
    const data =
    {
      name: evt.target.name,
      description: evt.target.description,
      start: evt.target.start,
      end: evt.target.end
    };

    fetch('/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => { 
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    evt.preventDefault()
  }

  return (
    <div className='addEventContainer'>
      <h1 className="addEventTitle" >Add an Event</h1>

      <form className="eventContainer" method="POST" onSubmit={handleSubmit}>
        <input type="hidden" name="userid" value={objectId} />
        <input
          className="eventInput"
          type="text"
          placeholder="Establishment Name "
          name="name"
          onChange={setEventName}
        ></input>
        <input
          className="eventInput"
          type="text"
          placeholder="Description "
          name="description"
          onChange={setEventDescription}
        />
        <br></br>
        <label className="eventLabel" htmlFor="date">
          Event Date:
        </label>
        <br></br>
        <input
          className="eventInput"
          name="date"
          type="date"
          onChange={setEventDate}
        />
        <label className="eventLabel" htmlFor="start">
          Start and End Time:
        </label>
        <br></br>
        <input
          className="eventInput"
          type="time"
          placeholder="Start Time: "
          name="start"
          onChange={setEventStartTime}
        />
        <input
          className="eventInput"
          type="time"
          placeholder="End Time: "
          name="end"
          onChange={setEventEndTime}
        />
        <br></br>
        <input id="eventSubmit" type="submit" value="Save" />
      </form>

    </div>
  )
}

export default AddEvent;
