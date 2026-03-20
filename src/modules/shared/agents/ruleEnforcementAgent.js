"use client";

/**
 * Rule Enforcement Agent
 * Ensures development follows the rules defined in doc/rules.md
 */
class RuleEnforcementAgent {
  constructor() {
    this.rules = this.loadRules();
  }

  /**
   * Load rules from rules.md
   * In a real implementation, this would fetch/parse the actual document
   * For now, we'll encode the key rules programmatically
   */
  loadRules() {
    return {
      // Rule 1: No Theme, Color, or Component Changes
      noThemeChanges: true,
      preserveDesignSystem: true,
      respectBootstrapFramework: true,
      preserveGlobalsCss: true,

      // Rule 2: Client-Side Only (No Backend - Figma-Like Static)
      clientSideOnly: true,
      noApiCalls: true,
      useMockDataPattern: true,
      simulateWorkflowsWithStaticState: true,

      // Rule 3: Module-Based File Structure
      moduleBasedStructure: true,
      preventNamingConflicts: true,
      newDirsFollowPattern: "src/modules/{role}/",
      componentsSelfContained: true,

      // Rule 4: Tailwind CSS for New Components Only
      useTailwindForNewComponents: true,
      doNotModifyExistingStyling: true,
      existingBootstrapClassesUntouched: true,
      newPagesCanUseTailwind: true,
      existingPagesUseMixedPattern: true,
    };
  }

  /**
   * Validate that a component follows the rules
   * @param {Object} componentInfo - Information about the component to validate
   * @returns {Object} Validation result with passed/failed rules
   */
  validateComponent(componentInfo) {
    const results = {
      passed: [],
      failed: [],
      warnings: [],
    };

    // Rule 1 validation
    if (componentInfo.modifiesThemeColors || componentInfo.modifiesCssVariables) {
      results.failed.push("Rule 1 Violation: Do not modify existing theme colors or CSS variables");
    } else {
      results.passed.push("Rule 1 Compliance: Theme colors and CSS variables preserved");
    }

    if (componentInfo.modifiesExistingComponentStyling) {
      results.failed.push("Rule 1 Violation: Do not modify existing component styling");
    } else {
      results.passed.push("Rule 1 Compliance: Existing component styling preserved");
    }

    // Rule 2 validation
    if (componentInfo.makesApiCalls || componentInfo.requiresBackend) {
      results.failed.push("Rule 2 Violation: All functionality must work client-side with mock/static data");
    } else {
      results.passed.push("Rule 2 Compliance: Client-side only implementation");
    }

    // Rule 3 validation
    if (componentInfo.filePath && !componentInfo.filePath.includes(`/modules/${componentInfo.role}/`)) {
      results.failed.push(`Rule 3 Violation: Component should be in src/modules/${componentInfo.role}/`);
    } else {
      results.passed.push("Rule 3 Compliance: Module-based file structure followed");
    }

    // Rule 4 validation
    if (componentInfo.isNewComponent && !componentInfo.usesTailwind) {
      results.failed.push("Rule 4 Violation: New components must use Tailwind CSS");
    } else if (componentInfo.isExistingComponent && componentInfo.modifiesExistingStyling) {
      results.failed.push("Rule 4 Violation: Do not modify existing components' styling");
    } else {
      results.passed.push("Rule 4 Compliance: Tailwind usage rules followed");
    }

    return results;
  }

  /**
   * Validate that a file follows the rules
   * @param {string} filePath - Path to the file to validate
   * @param {Object} fileContent - Content and metadata of the file
   * @returns {Object} Validation result
   */
  validateFile(filePath, fileContent) {
    // Extract role from file path if it's in modules
    const roleMatch = filePath.match(/src\/modules\/(\w+)\//);
    const role = roleMatch ? roleMatch[1] : null;

    const componentInfo = {
      filePath,
      role: role || "shared",
      isNewComponent: filePath.includes("-new.") || fileContent.isNewComponent,
      isExistingComponent: !filePath.includes("-new.") && !fileContent.isNewComponent,
      modifiesThemeColors: fileContent.modifiesThemeColors || false,
      modifiesCssVariables: fileContent.modifiesCssVariables || false,
      modifiesExistingComponentStyling: fileContent.modifiesExistingStyling || false,
      makesApiCalls: fileContent.makesApiCalls || false,
      requiresBackend: fileContent.requiresBackend || false,
      usesTailwind: fileContent.usesTailwind || false,
    };

    return this.validateComponent(componentInfo);
  }

  /**
   * Get a summary of all rules
   * @returns {Object} Summary of rules by category
   */
  getRulesSummary() {
    return {
      coreRules: [
        "Rule 1: No Theme, Color, or Component Changes",
        "Rule 2: Client-Side Only (No Backend - Figma-Like Static)",
        "Rule 3: Module-Based File Structure",
        "Rule 4: Tailwind CSS for New Components Only"
      ],
      description: "This agent ensures all development follows the VeriTask Platform development rules"
    };
  }
}

// Export singleton instance
const ruleEnforcementAgent = new RuleEnforcementAgent();
export default ruleEnforcementAgent;