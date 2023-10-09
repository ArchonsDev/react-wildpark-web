import React from "react";
import styles from './style.module.css';

const Modal = (props) => {
  const showModal = props?.showModal;
  const onCloseCallback = props?.closeCallback;
  const title = props?.title ? props?.title : "Modal";
  const buttonText = props?.buttonText ? props?.buttonText : "Save";

  return (
    <>
      {showModal && (
        <div>
          <div className={`${styles.modalBackdrop}`} tabIndex="-1" onClick={onCloseCallback}></div>
          <div className="modal fade show" tabIndex="-2" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onCloseCallback}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {props.children}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onCloseCallback}>Close</button>
                  <button type="button" className="btn btn-primary">{buttonText}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;