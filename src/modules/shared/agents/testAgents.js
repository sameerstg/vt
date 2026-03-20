"use client";

// Test script to validate agents
import ruleEnforcementAgent from "./ruleEnforcementAgent.js";
import codebaseAnalysisAgent from "./codebaseAnalysisAgent.js";
import businessRequirementAgent from "./businessRequirementAgent.js";

// Test data for components
const taskCreatorInfo = {
  filePath: "src/modules/client/components/TaskCreator.jsx",
  role: "client",
  isNewComponent: true,
  modifiesThemeColors: false,
  modifiesCssVariables: false,
  modifiesExistingComponentStyling: false,
  makesApiCalls: false, // Uses mock API
  requiresBackend: false,
  usesTailwind: false, // Currently uses Bootstrap classes, should be updated to Tailwind
};

const offerReviewerInfo = {
  filePath: "src/modules/client/components/OfferReviewer.jsx",
  role: "client",
  isNewComponent: true,
  modifiesThemeColors: false,
  modifiesCssVariables: false,
  modifiesExistingComponentStyling: false,
  makesApiCalls: false,
  requiresBackend: false,
  usesTailwind: false, // Currently uses Bootstrap classes
};

const escrowFundingInfo = {
  filePath: "src/modules/client/components/EscrowFunding.jsx",
  role: "client",
  isNewComponent: true,
  modifiesThemeColors: false,
  modifiesCssVariables: false,
  modifiesExistingComponentStyling: false,
  makesApiCalls: false,
  requiresBackend: false,
  usesTailwind: false, // Currently uses Bootstrap classes
};

const paymentReleaserInfo = {
  filePath: "src/modules/client/components/PaymentReleaser.jsx",
  role: "client",
  isNewComponent: true,
  modifiesThemeColors: false,
  modifiesCssVariables: false,
  modifiesExistingComponentStyling: false,
  makesApiCalls: false,
  requiresBackend: false,
  usesTailwind: false, // Currently uses Bootstrap classes
};

console.log("Testing Rule Enforcement Agent:");
console.log("Task Creator Validation:", ruleEnforcementAgent.validateFile(taskCreatorInfo.filePath, taskCreatorInfo));
console.log("Offer Reviewer Validation:", ruleEnforcementAgent.validateFile(offerReviewerInfo.filePath, offerReviewerInfo));
console.log("Escrow Funding Validation:", ruleEnforcementAgent.validateFile(escrowFundingInfo.filePath, escrowFundingInfo));
console.log("Payment Releaser Validation:", ruleEnforcementAgent.validateFile(paymentReleaserInfo.filePath, paymentReleaserInfo));

console.log("\nTesting Business Requirement Agent:");
const taskCreatorReqInfo = {
  category: "taskManagement",
  hasTitleField: true,
  hasDescriptionField: true,
  supportsPhysicalTaskType: true,
  supportsVirtualTaskType: true,
  capturesGpsLocationForPhysical: true, // Has address field for physical tasks
  budgetModelSelection: true,
  urgencySchedule: true,
  editPriorAcceptance: true,
  visibilityPriority: true
};

console.log("Task Creator Requirements Validation:", businessRequirementAgent.validateFeatureSet(taskCreatorReqInfo));

console.log("\nTesting Codebase Analysis Agent:");
console.log("Current Analysis:", JSON.stringify(codebaseAnalysisAgent.getAnalysis(), null, 2));

// Test updating analysis
codebaseAnalysisAgent.updateAnalysis({
  lastValidation: new Date().toISOString(),
  validatedComponents: [
    "TaskCreator.jsx",
    "OfferReviewer.jsx", 
    "EscrowFunding.jsx",
    "PaymentReleaser.jsx"
  ]
});

console.log("Updated Analysis:", JSON.stringify(codebaseAnalysisAgent.getAnalysis(), null, 2));