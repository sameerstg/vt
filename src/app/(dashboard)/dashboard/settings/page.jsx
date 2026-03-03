import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AdminSaveButton from "@/components/dashboard/element/AdminSaveButton";
import AdminSettingsCategorySection from "@/components/dashboard/section/AdminSettingsCategorySection";
import { platformSettings, settingsCategories } from "@/data/adminDashboard";

export const metadata = {
  title: "Platform Settings",
};

export default function AdminSettingsPage() {
  return (
    <DashboardLayout>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb20 pt-2">
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2 className="title" style={{ color: '#2d138f', fontSize: '26px', fontWeight: '700' }}>Platform Settings</h2>
              <p className="text" style={{ color: '#5e6d82', fontSize: '14px' }}>Configure platform fees, automation, and core taxonomies.</p>
            </div>
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-lg-6">
            <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 h-100">
              <h4 className="title text-[18px] font-bold text-[#6200ee] mb20 border-b border-light pb10 flex items-center gap-2">
                <i className="flaticon-dollar text-slate-400 fz16" />
                Fee Configuration
              </h4>
               <div className="mb15 px-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Base Fee</div>
                <div className="text-2xl font-bold text-slate-800">{platformSettings.currentFeePercent}%</div>
                <div className="mt-1 text-[10px] text-slate-400 font-medium italic">
                  Operator: {platformSettings.lastUpdatedBy}
                </div>
              </div>
              <div className="mt-4 space-y-3 px-2">
                <div className="space-y-1">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Adjust Rate (%)</label>
                  <input
                    type="number"
                    placeholder="Enter new fee %"
                    defaultValue={platformSettings.currentFeePercent}
                    className="h-10 w-full rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-50 transition bg-slate-50/30"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-1">
                   <button className="ud-btn btn-light-thm btn-sm h-9 px-4 fz12 flex items-center gap-1 border-0" style={{ backgroundColor: '#f0f3ff', color: '#5b44ff' }}>
                    Preview
                  </button>
                  <AdminSaveButton />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 h-100">
              <h4 className="title text-[18px] font-bold text-[#6200ee] mb20 border-b border-light pb10 flex items-center gap-2">
                <i className="flaticon-contract text-slate-400 fz16" />
                Auto Release Logic
              </h4>
               <div className="mb20 px-2">
                 <p className="text-xs text-slate-500 font-medium leading-relaxed">System-wide automation for non-disputed escrow funds.</p>
              </div>
              <div className="px-2 space-y-3">
                <div className="space-y-1">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Post-Completion Window</label>
                    <select className="h-10 w-full rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-700 outline-none bg-slate-50/30">
                      <option>
                        {platformSettings.autoReleaseAfter}
                      </option>
                      <option>1 Day</option>
                      <option>3 Days</option>
                      <option>7 Days</option>
                    </select>
                </div>
                <label className="flex items-center gap-3 rounded-xl border border-slate-50 bg-slate-50/30 p-3 transition-all hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-200"
                    defaultChecked={platformSettings.autoReleaseEnabled}
                  />
                  <div>
                    <div className="text-[13px] font-bold text-slate-800">Activate Automation</div>
                    <div className="text-[10px] font-bold text-slate-400 leading-none">Force release after duration</div>
                  </div>
                </label>
                <div className="text-end pt-1">
                  <AdminSaveButton />
                </div>
              </div>
            </div>
          </div>
        </div>

        <AdminSettingsCategorySection categories={settingsCategories} />
      </div>
    </DashboardLayout>
  );
}
