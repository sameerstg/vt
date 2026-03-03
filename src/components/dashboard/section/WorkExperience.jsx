"use client";
import { Tooltip } from "react-tooltip";

export default function WorkExperience() {
  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb30 d-sm-flex justify-content-between">
          <h5 className="list-title">Work &amp; Experience</h5>
          <button 
            className="px-4 h-9 rounded-lg text-xs font-bold text-white transition-all active:translate-y-0.5 active:shadow-none bg-[#3b82f6]"
            style={{ 
              border: '1px solid #000',
              boxShadow: '0 3px 0 #000',
              textShadow: '0 1px 1px rgba(0,0,0,0.1)'
            }}
          >
            <i className="icon far fa-plus mr-1" />
            Add Experience
          </button>
        </div>
        <div className="position-relative">
          <div className="educational-quality">
            <div className="m-circle text-thm">M</div>
            <div className="wrapper mb40 position-relative">
              <div className="del-edit">
                <div className="d-flex">
                  <a className="icon me-2" id="edit">
                    <Tooltip anchorSelect="#edit" className="ui-tooltip">
                      Edit
                    </Tooltip>
                    <span className="flaticon-pencil" />
                  </a>
                  <a className="icon" id="delete">
                    <Tooltip anchorSelect="#delete" className="ui-tooltip">
                      Delete
                    </Tooltip>
                    <span className="flaticon-delete" />
                  </a>
                </div>
              </div>
              <span className="tag">2012 - 2014</span>
              <h5 className="mt15">UX Designer</h5>
              <h6 className="text-thm">Dropbox</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a
                ipsum tellus. Interdum et malesuada fames ac ante ipsum{" "}
                <br className="d-none d-lg-block" /> primis in faucibus.
              </p>
            </div>
            <div className="m-circle before-none text-thm">M</div>
            <div className="wrapper mb30 position-relative">
              <div className="del-edit">
                <div className="d-flex">
                  <a className="icon me-2" id="edit">
                    <Tooltip anchorSelect="#edit" className="ui-tooltip">
                      Edit
                    </Tooltip>
                    <span className="flaticon-pencil" />
                  </a>
                  <a className="icon" id="delete">
                    <Tooltip anchorSelect="#delete" className="ui-tooltip">
                      Delete
                    </Tooltip>
                    <span className="flaticon-delete" />
                  </a>
                </div>
              </div>
              <span className="tag">2008 - 2012</span>
              <h5 className="mt15">Art Director</h5>
              <h6 className="text-thm">amazon</h6>
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a
                ipsum tellus. Interdum et malesuada fames ac ante ipsum{" "}
                <br className="d-none d-lg-block" /> primis in faucibus.
              </p>
            </div>
          </div>
          <div className="text-start">
            <button 
              type="button" 
              className="flex items-center justify-center gap-2 px-8 h-12 rounded-lg font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-purple-100"
              style={{ backgroundColor: '#2d0087' }}
            >
              <span className="text-base">Save</span>
              <i className="fal fa-arrow-up-right font-light" style={{ fontSize: '18px' }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
