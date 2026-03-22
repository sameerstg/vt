"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardNavigation from "../header/DashboardNavigation";
import SelectInput from "../option/SelectInput";
import MilestoneForm from "../element/MilestoneForm";

const categories = [
  { option: "Select Category", value: "" },
  { option: "Web Development", value: "web-development" },
  { option: "Mobile Development", value: "mobile-development" },
  { option: "Design", value: "design" },
  { option: "Writing", value: "writing" },
  { option: "Cleaning", value: "cleaning" },
  { option: "Photography", value: "photography" },
  { option: "Moving", value: "moving" },
  { option: "Other", value: "other" },
];

const projectTypes = [
  { option: "Physical", value: "PHYSICAL" },
  { option: "Virtual", value: "VIRTUAL" },
];

const budgetModels = [
  { option: "Fixed Price", value: "FIXED" },
  { option: "Milestone Based", value: "MILESTONE" },
];

const urgencyLevels = [
  { option: "Low", value: "LOW" },
  { option: "Medium", value: "MEDIUM" },
  { option: "High", value: "HIGH" },
];

export default function CreateProjectForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "VIRTUAL",
    category: "",
    budgetModel: "FIXED",
    budget: "",
    urgency: "MEDIUM",
    address: "",
  });
  const [milestones, setMilestones] = useState([]);
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelect = (name) => (option, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMilestone = (milestone) => {
    setMilestones(prev => [...prev, { ...milestone, id: `temp-${Date.now()}` }]);
    setShowMilestoneForm(false);
  };

  const handleRemoveMilestone = (id) => {
    setMilestones(prev => prev.filter(m => m.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const projectData = {
        ...formData,
        budget: parseFloat(formData.budget) || 0,
        milestones: milestones.map(m => ({
          title: m.title,
          description: m.description,
          amount: parseFloat(m.amount),
          dueDate: m.dueDate,
        })),
      };

      const res = await fetch("/api/client/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/client/manage-projects");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const totalMilestoneAmount = milestones.reduce((sum, m) => sum + (parseFloat(m.amount) || 0), 0);

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>Create Project</h2>
              <p className="text">Fill in the details below to create your project</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <button
                className="ud-btn btn-dark"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Posting..." : "Post Project"}
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-xl-8">
              <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                <div className="bdrb1 pb15 mb25">
                  <h5 className="list-title">Basic Information</h5>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">
                        Project Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Enter project title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="mb20">
                      <SelectInput
                        label="Project Type"
                        defaultSelect={{ option: projectTypes.find(t => t.value === formData.type)?.option, value: formData.type }}
                        handler={handleSelect("type")}
                        data={projectTypes}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="mb20">
                      <SelectInput
                        label="Category"
                        defaultSelect={{ option: categories.find(c => c.value === formData.category)?.option || "Select", value: formData.category }}
                        handler={handleSelect("category")}
                        data={categories}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="mb20">
                      <SelectInput
                        label="Budget Model"
                        defaultSelect={{ option: budgetModels.find(b => b.value === formData.budgetModel)?.option, value: formData.budgetModel }}
                        handler={handleSelect("budgetModel")}
                        data={budgetModels}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">
                        Budget Amount ($)
                      </label>
                      <input
                        type="number"
                        name="budget"
                        className="form-control"
                        placeholder="Enter amount"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {formData.type === "PHYSICAL" && (
                    <div className="col-sm-12">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Location / Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          className="form-control"
                          placeholder="Enter project location"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}

                  <div className="col-sm-6">
                    <div className="mb20">
                      <SelectInput
                        label="Urgency"
                        defaultSelect={{ option: urgencyLevels.find(u => u.value === formData.urgency)?.option, value: formData.urgency }}
                        handler={handleSelect("urgency")}
                        data={urgencyLevels}
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="mb10">
                      <label className="heading-color ff-heading fw500 mb10">
                        Project Details
                      </label>
                      <textarea
                        name="description"
                        className="form-control"
                        cols={30}
                        rows={6}
                        placeholder="Describe your project in detail"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {formData.budgetModel === "MILESTONE" && (
                <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                  <div className="bdrb1 pb15 mb25 d-flex justify-content-between align-items-center">
                    <h5 className="list-title mb-0">Milestones</h5>
                    <button
                      type="button"
                      className="ud-btn btn-thm btn-sm"
                      onClick={() => setShowMilestoneForm(true)}
                    >
                      <i className="flaticon-plus me-1" />
                      Add Milestone
                    </button>
                  </div>

                  {milestones.length === 0 ? (
                    <div className="text-center p30 bdr1 bdrs8">
                      <i className="flaticon-checklist fz40 text-muted mb15 d-block" />
                      <p className="text-muted mb0">
                        No milestones added yet. Add milestones to break down your project.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="milestones-list">
                        {milestones.map((milestone, index) => (
                          <div key={milestone.id} className="milestone-item bdr1 p15 mb10 bdrs8 d-flex justify-content-between align-items-center">
                            <div>
                              <span className="badge bg-light text-dark me-2">{index + 1}</span>
                              <span className="fw500">{milestone.title}</span>
                              <span className="text-muted ms-3">${parseFloat(milestone.amount).toLocaleString()}</span>
                            </div>
                            <button
                              type="button"
                              className="btn btn-sm text-danger"
                              onClick={() => handleRemoveMilestone(milestone.id)}
                            >
                              <i className="flaticon-delete" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="mt20 pt20 bdrbt1 d-flex justify-content-between">
                        <span className="fw600">Total</span>
                        <span className="fw600 text-thm fz18">${totalMilestoneAmount.toLocaleString()}</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="col-xl-4">
              <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                <div className="bdrb1 pb15 mb25">
                  <h5 className="list-title">Summary</h5>
                </div>
                <div className="summary-item d-flex justify-content-between mb10">
                  <span className="text-muted">Project Type</span>
                  <span className="fw500">{formData.type}</span>
                </div>
                <div className="summary-item d-flex justify-content-between mb10">
                  <span className="text-muted">Budget Model</span>
                  <span className="fw500">{formData.budgetModel}</span>
                </div>
                <div className="summary-item d-flex justify-content-between mb10">
                  <span className="text-muted">Budget</span>
                  <span className="fw500 text-thm fz18">
                    ${parseFloat(formData.budget || 0).toLocaleString()}
                  </span>
                </div>
                {formData.budgetModel === "MILESTONE" && milestones.length > 0 && (
                  <div className="summary-item d-flex justify-content-between mb10">
                    <span className="text-muted">Milestones</span>
                    <span className="fw500">{milestones.length}</span>
                  </div>
                )}
                <div className="mt30">
                  <button
                    type="submit"
                    className="ud-btn btn-thm w-100"
                    disabled={loading}
                  >
                    {loading ? "Posting..." : "Post Project"}
                    <i className="fal fa-arrow-right-long" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {showMilestoneForm && (
        <MilestoneForm
          onSubmit={handleAddMilestone}
          onClose={() => setShowMilestoneForm(false)}
        />
      )}
    </>
  );
}
