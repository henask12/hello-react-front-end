import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { fetchGreetings } from '../redux/greetings/greetingsSlice';

function Greeting() {
  const { greetings, isLoading, error } = useSelector(
    (state) => state.greetings,
  );
  const dispatchActions = useDispatch();

  useEffect(() => {
    dispatchActions(fetchGreetings());
  }, [dispatchActions]);

  let loadMessage = null;

  if (isLoading) {
    loadMessage = 'Loading message...';
  }

  if (error) {
    loadMessage = 'Error loading data';
  }

  return (
    <section>
      {isLoading || error ? (
        <p className="status">{loadMessage}</p>
      ) : (
        <div>
          {Array.isArray(greetings) && greetings.length > 0 ? (
            greetings.map((greeting) => (
              <p key={greeting.id} className="greeting-message">
                {greeting.content}
              </p>
            ))
          ) : (
            <p key={greetings.id} className="greeting-message">
              {greetings.content}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default Greeting;
