import React from 'react'
import '../styles/editProfileModal.css'

const EditProfileModal = () => {
    const [modal, setModal] = useState(false);

    //turns modal on and off
    const toggleModal = () => {
      setModal(!modal);
    };

    //prevents scrolling in the background when modal is open
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }
  
    return (
      <>
        <button onClick={toggleModal} className="btn-modal">
          Edit Profile
        </button>
  
        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <h2>Edit Profile</h2>
              <p>
                    Private account
                    {/* add toggle on right side to turn on and off profile privacy */}
                    {/* Use chadcn switch import to create toggle */}
                    {/* update state of profile privacy and save to firebase */}
              </p>
              <p>
                    Display top artists
                    {/* add toggle on right side to turn on and off display of top artists */}
                    {/* Use chadcn switch import to create toggle */}
                    {/* update state of profile privacy and save to firebase */}
              </p>
              <p>
                    Display top songs
                    {/* add toggle on right side to turn on and off display of top songs*/}
                    {/* Use chadcn switch import to create toggle */}
                    {/* update state of profile privacy and save to firebase */}
              </p>
              <button className="close-modal" onClick={toggleModal}>
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* <p> Optional What is displayed in the background</p> */}
      </>
    );
}

export default EditProfileModal
