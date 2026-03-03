import { product1 } from "@/data/product";
import MostViewServiceCard1 from "../card/MostViewServiceCard1";
import DoughnutChart from "../chart/DoughnutChart";
import LineChart from "../chart/LineChart";
import DashboardNavigation from "../header/DashboardNavigation";
import RecentServiceCard1 from "../card/RecentServiceCard1";
import { job1 } from "@/data/job";
import AdminKpiCard from "../card/AdminKpiCard";

export default function DashboardInfo() {
  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2 className="title" style={{ color: '#2d138f', fontSize: '30px', fontWeight: '700' }}>Dashboard</h2>
              <p className="text" style={{ color: '#5e6d82', fontSize: '15px' }}>Lorem ipsum dolor sit amet, consectetur.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-xxl-3">
            <AdminKpiCard 
              title="Services Offered" 
              value="25" 
              trend="10 New Offered" 
              icon="flaticon-contract" 
            />
          </div>
          <div className="col-sm-6 col-xxl-3">
            <AdminKpiCard 
              title="Completed Services" 
              value="1292" 
              trend="80+ New Completed" 
              icon="flaticon-success" 
            />
          </div>
          <div className="col-sm-6 col-xxl-3">
            <AdminKpiCard 
              title="in Queue Services" 
              value="182" 
              trend="35+ New Queue" 
              icon="flaticon-review" 
            />
          </div>
          <div className="col-sm-6 col-xxl-3">
            <AdminKpiCard 
              title="Total Review" 
              value="22,786" 
              trend="290+ New Review" 
              icon="flaticon-review-1" 
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xl-8">
            <LineChart />
          </div>
          <div className="col-xl-4">
            <DoughnutChart />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-xxl-4">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="d-flex justify-content-between bdrb1 pb15 mb20">
                <h5 className="title text-[18px] font-bold text-[#6200ee]">Most Viewed Services</h5>
                <a className="text-decoration-underline text-thm6">View All</a>
              </div>
              <div className="dashboard-img-service">
                {product1.slice(0, 3).map((item, i) => (
                  <div key={i}>
                    <MostViewServiceCard1 data={item} />
                    {product1.slice(0, 3).length !== i + 1 && (
                      <hr className="opacity-100 mt-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xxl-4">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="d-flex justify-content-between bdrb1 pb15 mb30">
                <h5 className="title text-[18px] font-bold text-[#6200ee]">Recent Purchased Services</h5>
                <a className="text-decoration-underline text-thm6">View All</a>
              </div>
              <div className="dashboard-img-service">
                {job1.slice(0, 3).map((item, i) => (
                  <div key={i}>
                    <RecentServiceCard1 data={item} />
                    {product1.slice(0, 3).length !== i + 1 && (
                      <hr className="opacity-100 mt-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xxl-4">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb30">
                <h5 className="title text-[18px] font-bold text-[#6200ee]">Recent Activity</h5>
              </div>
              <div className="dashboard-timeline-label">
                <div className="timeline-item pb15">
                  <div className="child-timeline-label">08:42</div>
                  {/*end::Label*/}
                  {/*begin::Badge*/}
                  <div className="timeline-badge d-flex align-items-center">
                    <i className="fas fa-genderless" />
                  </div>
                  {/*end::Badge*/}
                  {/*begin::Text*/}
                  <div className="ra_pcontent pl10">
                    <span className="title">Purchase by Ali Price</span> <br />{" "}
                    <span className="subtitle">
                      Product noise evolve smartwatch
                    </span>
                  </div>
                  {/*end::Text*/}
                </div>
              </div>
              <div className="dashboard-timeline-label">
                <div className="timeline-item pb15">
                  {/*begin::Label*/}
                  <div className="child-timeline-label">14:37</div>
                  {/*end::Label*/}
                  {/*begin::Badge*/}
                  <div className="timeline-badge d-flex align-items-center color3">
                    <i className="fas fa-genderless" />
                  </div>
                  {/*end::Badge*/}
                  {/*begin::Text*/}
                  <div className="ra_pcontent pl10">
                    <span className="title">
                      Make deposit{" "}
                      <span className="text-thm6 fw500">USD 700</span> to TFN
                    </span>
                  </div>
                  {/*end::Text*/}
                </div>
              </div>
              <div className="dashboard-timeline-label">
                <div className="timeline-item pb0">
                  {/*begin::Label*/}
                  <div className="child-timeline-label">16:50</div>
                  {/*end::Label*/}
                  {/*begin::Badge*/}
                  <div className="timeline-badge d-flex align-items-center color4">
                    <i className="fas fa-genderless" />
                  </div>
                  {/*end::Badge*/}
                  {/*begin::Text*/}
                  <div className="ra_pcontent pl10">
                    <span className="title">
                      Natasha Carey have liked the products
                    </span>{" "}
                    <br />{" "}
                    <span className="subtitle">
                      Allow users to like products in your WooCommerce store.
                    </span>
                  </div>
                  {/*end::Text*/}
                </div>
              </div>
              <div className="dashboard-timeline-label">
                <div className="timeline-item pb10">
                  {/*begin::Label*/}
                  <div className="child-timeline-label">21:03</div>
                  {/*end::Label*/}
                  {/*begin::Badge*/}
                  <div className="timeline-badge d-flex align-items-center color5">
                    <i className="fas fa-genderless" />
                  </div>
                  {/*end::Badge*/}
                  {/*begin::Text*/}
                  <div className="ra_pcontent pl10">
                    <span className="title">Favoried Product</span> <br />{" "}
                    <span className="subtitle">
                      Esther James have favorited product.
                    </span>
                  </div>
                  {/*end::Text*/}
                </div>
              </div>
              <div className="dashboard-timeline-label before-none mb30">
                <div className="timeline-item">
                  {/*begin::Label*/}
                  <div className="child-timeline-label">23:07</div>
                  {/*end::Label*/}
                  {/*begin::Badge*/}
                  <div className="timeline-badge d-flex align-items-center color6">
                    <i className="fas fa-genderless" />
                  </div>
                  {/*end::Badge*/}
                  {/*begin::Text*/}
                  <div className="ra_pcontent pl10">
                    <span className="title">
                      Today offers by Digitech Galaxy
                    </span>{" "}
                    <br />{" "}
                    <span className="subtitle">
                      Offer is valid on orders of Rs.500 Or above for selected
                      products only.
                    </span>
                  </div>
                  {/*end::Text*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
