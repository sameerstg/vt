"use client";

/**
 * Business Requirement Compliance Agent
 * Ensures development follows the business requirements in doc/business-requirement.md
 */
class BusinessRequirementAgent {
  constructor() {
    this.requirements = this.loadRequirements();
  }

  /**
   * Load business requirements from business-requirement.md
   * In a real implementation, this would fetch/parse the actual document
   */
  loadRequirements() {
    return {
      // Authentication & User Verification
      auth: {
        registration: { id: "AUTH-01", priority: "Must Have", description: "User registration via email address or phone number" },
        otpVerification: { id: "AUTH-02", priority: "Must Have", description: "OTP-based verification (email or SMS)" },
        secureLogin: { id: "AUTH-03", priority: "Must Have", description: "Secure login and session management" },
        profileCreation: { id: "AUTH-04", priority: "Must Have", description: "Profile creation: full name, phone, location, photo, government ID" },
        roleSelection: { id: "AUTH-05", priority: "Must Have", description: "Role selection during onboarding (Client, Worker, Contractor)" }
      },
      
      // Task Creation & Management
      taskManagement: {
        createTask: { id: "TASK-01", priority: "Must Have", description: "Create task with title and detailed description" },
        specifyTaskType: { id: "TASK-02", priority: "Must Have", description: "Specify task type: Physical or Virtual" },
        gpsLocation: { id: "TASK-03", priority: "Must Have", description: "For Physical tasks: GPS location capture and display" },
        virtualNoLocation: { id: "TASK-04", priority: "Must Have", description: "For Virtual tasks: No location requirement" },
        budgetModel: { id: "TASK-05", priority: "Must Have", description: "Budget model selection: Fixed-price or Milestone-based" },
        urgencySchedule: { id: "TASK-06", priority: "Must Have", description: "Set urgency level and preferred date/time window" },
        taskBundling: { id: "TASK-07", priority: "Should Have", description: "Task bundling: Parent task with subtasks, each with own scope/amount" },
        editPriorAcceptance: { id: "TASK-08", priority: "Must Have", description: "Edit task prior to acceptance" },
        visibilityPriority: { id: "TASK-09", priority: "Must Have", description: "Task visibility priority: nearby radius > city > state" }
      },
      
      // Task Application, Offers & Assignment
      taskApplication: {
        acceptPostedPrice: { id: "OFFER-01", priority: "Must Have", description: "Workers can accept posted task price" },
        submitCustomOffer: { id: "OFFER-02", priority: "Must Have", description: "Workers can submit custom offer with pricing and terms" },
        viewApplications: { id: "OFFER-03", priority: "Must Have", description: "Clients can view all applications and offers" },
        reviewWorkerProfiles: { id: "OFFER-04", priority: "Must Have", description: "Clients can review worker profiles" },
        selectAssignCandidate: { id: "OFFER-05", priority: "Must Have", description: "Clients can select and assign one candidate" }
      },
      
      // Payments, Escrow & Milestones
      paymentsEscrow: {
        platformPaymentsOnly: { id: "PAY-01", priority: "Must Have", description: "All payments processed exclusively through platform" },
        escrowBeforeWork: { id: "PAY-02", priority: "Must Have", description: "Escrow funding required before work begins" },
        fixedPriceModel: { id: "PAY-03", priority: "Must Have", description: "Fixed-price escrow model" },
        milestoneModel: { id: "PAY-04", priority: "Must Have", description: "Milestone-based escrow model" },
        defineMilestones: { id: "PAY-05", priority: "Must Have", description: "Define milestones during offer acceptance" },
        milestoneApproval: { id: "PAY-06", priority: "Must Have", description: "Each milestone requires client approval for release" },
        manualRelease: { id: "PAY-07", priority: "Must Have", description: "Manual client approval for payment release" },
        autoRelease: { id: "PAY-08", priority: "Should Have", description: "Auto-release after predefined approval window" }
      },
      
      // Contractor Teams & Payroll
      contractorTeams: {
        createManageTeams: { id: "TEAM-01", priority: "Must Have", description: "Contractors can create and manage teams" },
        assignSubcontractors: { id: "TEAM-02", priority: "Must Have", description: "Assign registered subcontractors to tasks" },
        receiveEscrow: { id: "TEAM-03", priority: "Must Have", description: "Contractor receives escrow funds" },
        distributePayments: { id: "TEAM-04", priority: "Must Have", description: "Contractor distributes payments to team members" },
        logDistributions: { id: "TEAM-05", priority: "Must Have", description: "Log all internal distributions for recordkeeping" },
        retainAccountability: { id: "TEAM-06", priority: "Must Have", description: "Contractor retains full accountability for delivery" }
      }
    };
  }

  /**
   * Validate that a feature implements a specific requirement
   * @param {string} requirementId - ID of the requirement to check
   * @param {Object} featureInfo - Information about the feature being implemented
   * @returns {Object} Validation result
   */
  validateRequirement(requirementId, featureInfo) {
    // Find the requirement
    let requirement = null;
    let category = null;
    
    for (const [cat, reqs] of Object.entries(this.requirements)) {
      for (const [reqId, req] of Object.entries(reqs)) {
        if (req.id === requirementId) {
          requirement = req;
          category = cat;
          break;
        }
      }
      if (requirement) break;
    }
    
    if (!requirement) {
      return {
        isValid: false,
        error: `Requirement ${requirementId} not found`,
        requirementId
      };
    }
    
    // Validate based on requirement type and feature info
    const validation = {
      requirementId,
      requirementDescription: requirement.description,
      priority: requirement.priority,
      isValid: true,
      warnings: [],
      errors: []
    };
    
    // Specific validations based on requirement ID
    switch (requirementId) {
      case "AUTH-01": // User registration
        if (!featureInfo.supportsEmailRegistration && !featureInfo.supportsPhoneRegistration) {
          validation.errors.push("Feature must support user registration via email or phone number");
          validation.isValid = false;
        }
        break;
        
      case "TASK-01": // Create task with title and description
        if (!featureInfo.hasTitleField || !featureInfo.hasDescriptionField) {
          validation.errors.push("Feature must include title and description fields for task creation");
          validation.isValid = false;
        }
        break;
        
      case "TASK-02": // Specify task type
        if (!featureInfo.supportsPhysicalTaskType || !featureInfo.supportsVirtualTaskType) {
          validation.errors.push("Feature must support both Physical and Virtual task types");
          validation.isValid = false;
        }
        break;
        
      case "TASK-03": // GPS location for physical tasks
        if (!featureInfo.capturesGpsLocationForPhysical) {
          validation.errors.push("Feature must capture GPS location for physical tasks");
          validation.isValid = false;
        }
        break;
        
      case "PAY-02": // Escrow funding required before work
        if (!featureInfo.requiresEscrowBeforeWork) {
          validation.errors.push("Feature must require escrow funding before work can begin");
          validation.isValid = false;
        }
        break;
        
      // Add more specific validations as needed
      default:
        // Generic validation - check if featureInfo indicates the requirement is met
        if (featureInfo.meetsRequirement !== undefined && !featureInfo.meetsRequirement) {
          validation.errors.push(`Feature does not meet requirement: ${requirement.description}`);
          validation.isValid = false;
        }
        break;
    }
    
    return validation;
  }

  /**
   * Validate that a component or feature set meets all applicable business requirements
   * @param {Object} featureSetInfo - Information about the feature set being implemented
   * @returns {Object} Overall validation result
   */
  validateFeatureSet(featureSetInfo) {
    const results = {
      passed: [],
      failed: [],
      warnings: [],
      overallValid: true
    };
    
    // Determine which requirements are relevant based on the feature set
    const relevantRequirements = this.determineRelevantRequirements(featureSetInfo);
    
    // Validate each relevant requirement
    for (const reqId of relevantRequirements) {
      const validation = this.validateRequirement(reqId, featureSetInfo);
      if (validation.isValid) {
        results.passed.push({
          requirementId: reqId,
          description: validation.requirementDescription
        });
      } else {
        results.failed.push({
          requirementId: reqId,
          description: validation.requirementDescription,
          errors: validation.errors
        });
        results.overallValid = false;
      }
      
      // Collect warnings
      if (validation.warnings && validation.warnings.length > 0) {
        results.warnings.push(...validation.warnings.map(w => ({
          requirementId: reqId,
          warning: w
        })));
      }
    }
    
    return results;
  }

  /**
   * Determine which requirements are relevant for a given feature set
   * @param {Object} featureSetInfo - Information about the feature set
   * @returns {Array} List of relevant requirement IDs
   */
  determineRelevantRequirements(featureSetInfo) {
    const relevant = [];
    
    // Check feature set category and determine relevant requirements
    if (featureSetInfo.category === "authentication") {
      relevant.push("AUTH-01", "AUTH-02", "AUTH-03", "AUTH-04", "AUTH-05");
    } else if (featureSetInfo.category === "taskManagement") {
      relevant.push("TASK-01", "TASK-02", "TASK-03", "TASK-04", "TASK-05", "TASK-06", "TASK-07", "TASK-08", "TASK-09");
    } else if (featureSetInfo.category === "taskApplication") {
      relevant.push("OFFER-01", "OFFER-02", "OFFER-03", "OFFER-04", "OFFER-05");
    } else if (featureSetInfo.category === "payments") {
      relevant.push("PAY-01", "PAY-02", "PAY-03", "PAY-04", "PAY-05", "PAY-06", "PAY-07", "PAY-08");
    } else if (featureSetInfo.category === "contractor") {
      relevant.push("TEAM-01", "TEAM-02", "TEAM-03", "TEAM-04", "TEAM-05", "TEAM-06");
    }
    
    // If no specific category, check feature flags
    if (relevant.length === 0) {
      if (featureSetInfo.includesRegistration) relevant.push("AUTH-01");
      if (featureSetInfo.includesOtpVerification) relevant.push("AUTH-02");
      if (featureSetInfo.includesSecureLogin) relevant.push("AUTH-03");
      if (featureSetInfo.includesProfileCreation) relevant.push("AUTH-04");
      if (featureSetInfo.includesRoleSelection) relevant.push("AUTH-05");
      
      if (featureSetInfo.supportsTaskCreation) relevant.push("TASK-01");
      if (featureSetInfo.allowsTaskTypeSpecification) relevant.push("TASK-02");
      // ... and so on for other features
    }
    
    return relevant;
  }

  /**
   * Get a summary of all business requirements by category
   * @returns {Object} Summary of requirements
   */
  getRequirementsSummary() {
    return {
      categories: Object.keys(this.requirements),
      totalRequirements: Object.values(this.requirements).flat().length,
      description: "This agent ensures all development follows the VeriTask Platform business requirements"
    };
  }
}

// Export singleton instance
const businessRequirementAgent = new BusinessRequirementAgent();
export default businessRequirementAgent;