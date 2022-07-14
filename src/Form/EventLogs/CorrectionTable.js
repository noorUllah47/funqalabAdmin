import React, { useEffect, useState } from 'react';
import EventForm from './EventForm';
import moment from 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import GetData from "../../api/GetData";
const CorrectionTable = ({ formData, correctionResponsedata, handleEditCorrection, handleDeleteCorrection, KYCCheck }) => {


  const [EditModel, setEditModel] = useState(false);
  const [Confirmation, setConfirmation] = useState(false);


  const handleEditClose = () => {
    setEditModel(false)

  };

  const handleDeleteBtnCorrection = () => {


    handleDeleteCorrection(initialvalues)
    setEditModel(false)
  }
  const handleEditSubmit = () => {
    setEditModel(false)
    setConfirmation(true)
  };



  const handleOpenEditModel = (editdata) => {
    setinitailvalues({ title: editdata?.title, message: editdata?.description, id: editdata?.id })
    setEditModel(true);

  }

  const CloseConfirmation = () => {
    // setConfirmation(true)
    setConfirmation(false)

  };
  const HandleSubmit = () => {


    if (onOffState) {
      handleEditCorrection(initialvalues, "showonAof", setConfirmation)
    }
    else {
      handleEditCorrection(initialvalues, "offonAof", setConfirmation)
    }

  };
  const [onOffState, setonOfState] = useState(false);
  const [initialvalues, setinitailvalues] = useState({
    title: "",
    message: "",
    id: "",
  })

  const handleCorrectionOnOffState = (e, data) => {
    setonOfState(e.target.checked)
    if (e.target.checked) {
      handleEditCorrection(data, 'showonAof')
    }
    else {
      handleEditCorrection(data, 'offonAof')
    }


  }

  function handleChange(e) {
    const { value, name, id } = e.target;

    setinitailvalues({ ...initialvalues, [name]: value });
  }
  useEffect(() => {
    // const response = GetData.getCorrectionData()
    // response.then(value => {

    //   console.log("corrstion data ================================", value);

    // })
    //   .catch(error => {
    //     console.log(error.response)
    //   })
    // moment.tz.setDefault('Asia/Karachi')
    // setTotal(Math.trunc((Data.length / 10) + 1))
  });



  // const formData1 = Data
  //   .slice(start, end).map((each) => {
  //     return (
  //       <div key={each.id}>
  //         <EventForm
  //           id={each.id}
  //           // time={moment(each.updatedAt).utc().format('H:mm:ss A')}
  //           // date={moment(each.updatedAt).utc().format('MM-DD-YYYY ')}

  //           time={moment.tz.setDefault('Asia/Karachi')(each.updatedAt).format('H:mm:ss A')}
  //           date={moment.tz.setDefault('Asia/Karachi')(each.updatedAt).utc().format('MM-DD-YYYY ')}


  //           event={each.description}
  //           status={each.status}
  //           each={each}
  //         />
  //       </div>
  //     );
  //   });

  return (
    <>
      <div className="mt-3 mb-0 row container mx-auto infoformpage py-2 infoformpagebrdrtop infoformpagebrdrbtm">
        <div className="col-2">
          <span className="t-grey-a fs14">DATE</span>
        </div>
        <div className="col-2 ">
          <span className="t-grey-a fs14">TITLE</span>
        </div>
        <div className="col-6 ">
          <span className="t-grey-a fs14">DESCRIPTION</span>
        </div>
        <div className="col-2">
          <span className="t-grey-a fs14">Status</span>
        </div>
      </div>
      {/* <div className=""> */}

      {correctionResponsedata?.map((element) => (



        <div className="container-fluid px-0 ">
          <div className="row container text-break infoformpagebrdrbtm pt-3 pb-3">
            <div className="col-2 ">
              <p>{moment.tz.setDefault('Asia/Karachi')(element?.updatedAt).utc().format('MM-DD-YYYY ')}</p>
            </div>

            <div className="col-2">
              <p>{element?.title}</p>
            </div>
            <div className="col-6 d-flex justify-content-between">
              <p>{element?.description} </p>
              <button type="button" onClick={() => handleOpenEditModel(element)} className='editbtn' disabled={KYCCheck == true}>Edit</button>
            </div>
            {console.log('KYCCheck= correction=================', KYCCheck)}
            <div className="col-2 ">
              <div className="form-check ms-2  form-switch" >
                {KYCCheck == true ? (
                  <input checked={false} className="form-check-input radiobtn " type="checkbox" id="flexSwitchCheckDefault" disabled />

                ) : (
                  <input defaultChecked={element?.status == 'true'} onChange={(e) => handleCorrectionOnOffState(e, element)} className="form-check-input radiobtn " type="checkbox" id="flexSwitchCheckDefault" />


                )}
              </div>
            </div>
          </div>
        </div>

      ))}
      {console.log('initial valuesis ======>>', initialvalues)}

      <Modal className='mx-4' show={EditModel} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title className='mx-4'>Edit Correction</Modal.Title>
        </Modal.Header>
        <Modal.Body className='mx-4' >  <form>
          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">Title</label>
            <input name="title" onChange={handleChange} value={initialvalues?.title} type="text" placeholder='Personal Profile' className="form-control" id="recipient-name" />
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Message</label>
            <textarea name='message' onChange={handleChange} value={initialvalues?.message} placeholder='Write your message here...' className="form-control" id="message-text"></textarea>
          </div>
        </form></Modal.Body>
        {/* <Modal.Footer> */}
        <div className=" mx-4 py-2 my-4 d-flex justify-content-between">
          <div>
            <Button className='submitbtn mx-3' variant="secondary" onClick={handleEditSubmit}>
              Submit
            </Button>
            <Button className='closebtn' variant="primary" onClick={handleEditClose}>
              Close
            </Button>
          </div>
          <Button className=' me-3 Deletebtn' variant="primary" onClick={handleDeleteBtnCorrection}>
            <FontAwesomeIcon className='trash' color='#FF4949' icon={faTrash} />  Delete
          </Button>
        </div>
        {/* </Modal.Footer> */}
      </Modal>
      <Modal size={"sm"} aria-labelledby="contained-modal-title-vcenter example-modal-sizes-title-sm"
        centered show={Confirmation} onHide={CloseConfirmation}>

        <Modal.Body  > <div className="d-flex justify-content-center text-center msgtext">
          Are you sure <br />you wish to proceed?
        </div></Modal.Body>
        {/* <Modal.Footer> */}
        <div className="p-2 d-flex justify-content-center my-3">
          <Button className='closebtn' variant="secondary" onClick={CloseConfirmation}>
            Close
          </Button>
          <Button className='submitbtn mx-3' variant="primary" onClick={HandleSubmit}>
            Save Changes
          </Button>
        </div>
        {/* </Modal.Footer> */}
      </Modal>
    </>
  );
};

{/* <h5 className="modal-title" id="exampleModalToggleLabel">Modal 1</h5> */ }
{/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */ }
export default CorrectionTable;

