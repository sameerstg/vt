import Pagination1 from "@/components/section/Pagination1";
import DashboardNavigation from "../header/DashboardNavigation";
import ManageJobCard from "../card/ManageJobCard";
import { managejob } from "@/data/dashboard";
import ProposalModal1 from "../modal/ProposalModal1";
import DeleteModal from "../modal/DeleteModal";
import Link from "next/link";

export default function ManageJobInfo() {
  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2 className="title" style={{ color: '#2d138f', fontSize: '30px', fontWeight: '700' }}>Manage Jobs</h2>
              <p className="text" style={{ color: '#5e6d82', fontSize: '15px' }}>Lorem ipsum dolor sit amet, consectetur.</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <Link
                href="/create-jobs"
                className="btn-3d-blue ml-auto"
              >
                Create Job
                <i className="fal fa-plus" />
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative" style={{ border: '1px solid #eee' }}>
              <div className="packages_table table-responsive">
                <table className="table-style3 table at-savesearch">
                  <thead className="t-head">
                    <tr>
                      <th scope="col" style={{ color: '#6200ee', fontWeight: '600', borderTop: 'none', paddingBottom: '20px' }}>Title</th>
                      <th scope="col" style={{ color: '#6200ee', fontWeight: '600', borderTop: 'none', paddingBottom: '20px' }}>Applications</th>
                      <th scope="col" style={{ color: '#6200ee', fontWeight: '600', borderTop: 'none', paddingBottom: '20px' }}>Created &amp; Expired</th>
                      <th scope="col" style={{ color: '#6200ee', fontWeight: '600', borderTop: 'none', paddingBottom: '20px' }}>Status</th>
                      <th scope="col" style={{ color: '#6200ee', fontWeight: '600', borderTop: 'none', paddingBottom: '20px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {managejob.map((item, i) => (
                      <ManageJobCard key={i} data={item} />
                    ))}
                  </tbody>
                </table>
                <div className="mt30">
                  <Pagination1 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProposalModal1 />
      <DeleteModal />
    </>
  );
}
