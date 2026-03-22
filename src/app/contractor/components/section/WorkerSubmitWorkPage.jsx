"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DashboardNavigation from "@/app/worker/components/header/DashboardNavigation";

export default function WorkerSubmitWorkPage({ projectId }) {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const res = await fetch("/api/worker/projects");
      const data = await res.json();
      if (data.success) {
        const proj =
          data.data.assigned.find(p => p.id === projectId) ||
          data.data.available.find(p => p.id === projectId);
        setProject(proj);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selected]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError("Please provide a description of your work.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/worker/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, action: "submit" }),
      });
      const data = await res.json();
      if (data.success) {
        router.push(`/worker/project/${projectId}`);
      } else {
        setError(data.error || "Failed to submit work.");
      }
    } catch (e) {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 400 }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="text-center p50">
          <h5 className="text-muted">Project not found</h5>
          <Link href="/worker/manage-projects" className="ud-btn btn-thm mt20">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="d-flex align-items-center gap-3 mb-3">
            <Link href={`/worker/project/${projectId}`} className="text-muted">
              <i className="fal fa-arrow-left-long" />
            </Link>
            <div className="dashboard_title_area mb-0">
              <h2>Submit Work</h2>
              <p className="text mb-0">{project.title}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-8">
          <div className="ps-widget bgc-white bdrs4 p30 mb30">
            <form onSubmit={handleSubmit}>
              <div className="mb25">
                <label className="fw500 ff-heading dark-color mb10 d-block">
                  Work Description <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  rows={6}
                  placeholder="Describe what you've completed, any notes for the client, and how the deliverables meet the project requirements..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="mb25">
                <label className="fw500 ff-heading dark-color mb10 d-block">
                  Attachments
                </label>
                <div
                  className="bdr1 bdrs8 p30 text-center"
                  style={{ borderStyle: "dashed", cursor: "pointer" }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <i className="flaticon-upload fz40 text-thm mb10 d-block" />
                  <p className="mb5 fw500">Click to upload files</p>
                  <p className="text-muted fz14 mb0">PDF, DOC, ZIP, Images — up to 20MB each</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="d-none"
                    onChange={handleFileChange}
                  />
                </div>

                {files.length > 0 && (
                  <div className="mt15">
                    {files.map((file, i) => (
                      <div key={i} className="d-flex align-items-center justify-content-between p10 bdr1 bdrs4 mb10">
                        <div className="d-flex align-items-center gap-2">
                          <i className="flaticon-page fz20 text-thm" />
                          <div>
                            <p className="mb0 fw500 fz14">{file.name}</p>
                            <p className="mb0 text-muted fz13">{(file.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeFile(i)}
                        >
                          <i className="fal fa-times" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {error && (
                <div className="alert alert-danger mb20">{error}</div>
              )}

              <div className="d-flex gap-3">
                <button
                  type="submit"
                  className="ud-btn btn-thm"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Work
                      <i className="fal fa-arrow-right-long" />
                    </>
                  )}
                </button>
                <Link href={`/worker/project/${projectId}`} className="ud-btn btn-light">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="ps-widget bgc-white bdrs4 p30 mb30">
            <h5 className="mb20">Project Info</h5>
            <div className="stat-item d-flex justify-content-between mb10">
              <span className="text-muted">Budget</span>
              <span className="fw500 text-thm">${project.budget.toLocaleString()}</span>
            </div>
            <div className="stat-item d-flex justify-content-between mb10">
              <span className="text-muted">Category</span>
              <span className="fw500">{project.category}</span>
            </div>
            <div className="stat-item d-flex justify-content-between mb10">
              <span className="text-muted">Type</span>
              <span className="fw500">{project.type}</span>
            </div>
            <div className="stat-item d-flex justify-content-between">
              <span className="text-muted">Payment</span>
              <span className="fw500">{project.budgetModel === "MILESTONE" ? "Milestone" : "Fixed"}</span>
            </div>
          </div>

          <div className="ps-widget bgc-white bdrs4 p30 mb30">
            <h5 className="mb15">Before Submitting</h5>
            <ul className="list-unstyled mb0">
              <li className="mb10 d-flex gap-2">
                <i className="flaticon-check fz14 text-thm mt-1" />
                <span className="fz14">All deliverables are complete</span>
              </li>
              <li className="mb10 d-flex gap-2">
                <i className="flaticon-check fz14 text-thm mt-1" />
                <span className="fz14">Files are properly named and organized</span>
              </li>
              <li className="mb10 d-flex gap-2">
                <i className="flaticon-check fz14 text-thm mt-1" />
                <span className="fz14">Description clearly explains the work done</span>
              </li>
              <li className="d-flex gap-2">
                <i className="flaticon-check fz14 text-thm mt-1" />
                <span className="fz14">Client can review and approve your work</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
