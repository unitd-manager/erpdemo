import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';

function JournalButton({ navigate }) {
    JournalButton.propTypes = {
    navigate: PropTypes.any,
  };
  return (
    <div>
      <ComponentCardV2>
      <Row>
          <Col>
          <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  setTimeout(() => {
                    navigate('/Journal');
                  }, 800);
                }}
              >
                Save
              </Button>
          </Col>
          <Col>
            <Button
              color="primary"
              className="shadow-none"
            //   onClick={() => {
            //     editTask();
            //   }}
            >
              Apply
            </Button>
          </Col>
         
          <Col>
            <Button
              className="shadow-none"
              color="dark"
              onClick={() => {
                navigate('/Journal');
              }}
            >
              Back to List
            </Button>
          </Col>
        </Row>
      </ComponentCardV2>
    </div>
  );
}

export default JournalButton;
