import { invoke } from "@tauri-apps/api/core";

/** Process type for tracking in ProcessRegistry */
export type ProcessType = 
  | { AgentRun: { agent_id: number; agent_name: string } }
  | { ClaudeSession: { session_id: string } };

/** Information about a running process */
export interface ProcessInfo {
  run_id: number;
  process_type: ProcessType;
  pid: number;
  started_at: string;
  project_path: string;
  task: string;
  model: string;
}

/**
 * Represents a project in the ~/.claude/projects directory
 */
export interface Project {
  /** The project ID (derived from the directory name) */
  id: string;
  /** The original project path (decoded from the directory name) */
  path: string;
  /** List of session IDs (JSONL file names without extension) */
  sessions: string[];
  /** Unix timestamp when the project directory was created */
  created_at: number;
}

/**
 * Represents a session with its metadata
 */
export interface Session {
  /** The session ID (UUID) */
  id: string;
  /** The project ID this session belongs to */
  project_id: string;
  /** The project path */
  project_path: string;
  /** Optional todo data associated with this session */
  todo_data?: any;
  /** Unix timestamp when the session file was created */
  created_at: number;
  /** First user message content (if available) */
  first_message?: string;
  /** Timestamp of the first user message (if available) */
  message_timestamp?: string;
}

/**
 * Represents the settings from ~/.claude/settings.json
 */
export interface ClaudeSettings {
  [key: string]: any;
}

/**
 * Represents the Claude Code version status
 */
export interface ClaudeVersionStatus {
  /** Whether Claude Code is installed and working */
  is_installed: boolean;
  /** The version string if available */
  version?: string;
  /** The full output from the command */
  output: string;
}

/**
 * Represents a CLAUDE.md file found in the project
 */
export interface ClaudeMdFile {
  /** Relative path from the project root */
  relative_path: string;
  /** Absolute path to the file */
  absolute_path: string;
  /** File size in bytes */
  size: number;
  /** Last modified timestamp */
  modified: number;
}

/**
 * Represents a file or directory entry
 */
export interface FileEntry {
  name: string;
  path: string;
  is_directory: boolean;
  size: number;
  extension?: string;
}

/**
 * Represents a Claude installation found on the system
 */
export interface ClaudeInstallation {
  path: string;
  /** Version string if available */
  version?: string;
  /** Source of discovery (e.g., "nvm", "system", "homebrew", "which") */
  source: string;
}

/**
 * Represents a custom agent
 */
export interface Agent {
  id?: number;
  name: string;
  icon: string;
  system_prompt: string;
  default_task?: string;
  model: string;
  created_at: string;
  updated_at: string;
}

/**
 * Represents an exported agent
 */
export interface AgentExport {
  version: number;
  exported_at: string;
  agent: {
    name: string;
    icon: string;
    system_prompt: string;
    default_task?: string;
    model: string;
  };
}

/**
 * Represents a GitHub agent file
 */
export interface GitHubAgentFile {
  name: string;
  path: string;
  download_url: string;
  size: number;
  sha: string;
}

/**
 * Represents an agent run
 */
export interface AgentRun {
  id?: number;
  agent_id: number;
  agent_name: string;
  agent_icon: string;
  task: string;
  model: string;
  project_path: string;
  session_id: string;
  status: string; // 'pending', 'running', 'completed', 'failed', 'cancelled'
  pid?: number;
  process_started_at?: string;
  created_at: string;
  completed_at?: string;
}

/**
 * Represents metrics for an agent run
 */
export interface AgentRunMetrics {
  duration_ms?: number;
  total_tokens?: number;
  cost_usd?: number;
  message_count?: number;
}

/**
 * Represents an agent run with metrics
 */
export interface AgentRunWithMetrics {
  id?: number;
  agent_id: number;
  agent_name: string;
  agent_icon: string;
  task: string;
  model: string;
  project_path: string;
  session_id: string;
  status: string; // 'pending', 'running', 'completed', 'failed', 'cancelled'
  pid?: number;
  process_started_at?: string;
  created_at: string;
  completed_at?: string;
  metrics?: AgentRunMetrics;
  output?: string; // Real-time JSONL content
}

/**
 * Represents a usage entry
 */
export interface UsageEntry {
  project: string;
  timestamp: string;
  model: string;
  input_tokens: number;
  output_tokens: number;
  cache_write_tokens: number;
  cache_read_tokens: number;
  cost: number;
}

/**
 * Represents model usage statistics
 */
export interface ModelUsage {
  model: string;
  total_cost: number;
  total_tokens: number;
  input_tokens: number;
  output_tokens: number;
  cache_creation_tokens: number;
  cache_read_tokens: number;
  session_count: number;
}

/**
 * Represents daily usage statistics
 */
export interface DailyUsage {
  date: string;
  total_cost: number;
  total_tokens: number;
  models_used: string[];
}

/**
 * Represents project usage statistics
 */
export interface ProjectUsage {
  project_path: string;
  project_name: string;
  total_cost: number;
  total_tokens: number;
  session_count: number;
  last_used: string;
}

/**
 * Represents overall usage statistics
 */
export interface UsageStats {
  total_cost: number;
  total_tokens: number;
  total_input_tokens: number;
  total_output_tokens: number;
  total_cache_creation_tokens: number;
  total_cache_read_tokens: number;
  total_sessions: number;
  by_model: ModelUsage[];
  by_date: DailyUsage[];
  by_project: ProjectUsage[];
}

/**
 * Represents a checkpoint
 */
export interface Checkpoint {
  id: string;
  sessionId: string;
  projectId: string;
  messageIndex: number;
  timestamp: string;
  description?: string;
  parentCheckpointId?: string;
  metadata: CheckpointMetadata;
}

/**
 * Represents checkpoint metadata
 */
export interface CheckpointMetadata {
  totalTokens: number;
  modelUsed: string;
  userPrompt: string;
  fileChanges: number;
  snapshotSize: number;
}

/**
 * Represents a file snapshot
 */
export interface FileSnapshot {
  checkpointId: string;
  filePath: string;
  content: string;
  hash: string;
  isDeleted: boolean;
  permissions?: number;
  size: number;
}

/**
 * Represents a timeline node
 */
export interface TimelineNode {
  checkpoint: Checkpoint;
  children: TimelineNode[];
  fileSnapshotIds: string[];
}

/**
 * Represents a session timeline
 */
export interface SessionTimeline {
  sessionId: string;
  rootNode?: TimelineNode;
  currentCheckpointId?: string;
  autoCheckpointEnabled: boolean;
  checkpointStrategy: CheckpointStrategy;
  totalCheckpoints: number;
}

/**
 * Represents checkpoint strategy types
 */
export type CheckpointStrategy = 'manual' | 'per_prompt' | 'per_tool_use' | 'smart';

/**
 * Represents a checkpoint result
 */
export interface CheckpointResult {
  checkpoint: Checkpoint;
  filesProcessed: number;
  warnings: string[];
}

/**
 * Represents a checkpoint diff
 */
export interface CheckpointDiff {
  fromCheckpointId: string;
  toCheckpointId: string;
  modifiedFiles: FileDiff[];
  addedFiles: string[];
  deletedFiles: string[];
  tokenDelta: number;
}

/**
 * Represents a file diff
 */
export interface FileDiff {
  path: string;
  additions: number;
  deletions: number;
  diffContent?: string;
}

/**
 * Represents an MCP server
 */
export interface MCPServer {
  /** Server name/identifier */
  name: string;
  /** Transport type: "stdio" or "sse" */
  transport: string;
  /** Command to execute (for stdio) */
  command?: string;
  /** Command arguments (for stdio) */
  args: string[];
  /** Environment variables */
  env: Record<string, string>;
  /** URL endpoint (for SSE) */
  url?: string;
  /** Configuration scope: "local", "project", or "user" */
  scope: string;
  /** Whether the server is currently active */
  is_active: boolean;
  /** Server status */
  status: ServerStatus;
}

/**
 * Represents server status
 */
export interface ServerStatus {
  /** Whether the server is running */
  running: boolean;
  /** Last error message if any */
  error?: string;
  /** Last checked timestamp */
  last_checked?: number;
}

/**
 * Represents MCP project configuration
 */
export interface MCPProjectConfig {
  mcpServers: Record<string, MCPServerConfig>;
}

/**
 * Represents MCP server configuration
 */
export interface MCPServerConfig {
  command: string;
  args: string[];
  env: Record<string, string>;
}

/**
 * Represents the result of adding a server
 */
export interface AddServerResult {
  success: boolean;
  message: string;
  server_name?: string;
}

/**
 * Represents the result of importing servers
 */
export interface ImportResult {
  imported_count: number;
  failed_count: number;
  servers: ImportServerResult[];
}

/**
 * Represents the result of importing a single server
 */
export interface ImportServerResult {
  name: string;
  success: boolean;
  error?: string;
}

/**
 * Main API object for interacting with the backend
 */
export const api = {
  /**
   * Lists all projects from the ~/.claude/projects directory
   */
  async listProjects(): Promise<Project[]> {
    try {
      return await invoke("list_projects");
    } catch (error) {
      console.error("Failed to list projects:", error);
      throw error;
    }
  },

  /**
   * Gets sessions for a specific project
   */
  async getProjectSessions(projectId: string): Promise<Session[]> {
    try {
      return await invoke("get_project_sessions", { projectId });
    } catch (error) {
      console.error("Failed to get project sessions:", error);
      throw error;
    }
  },

  /**
   * Fetches available GitHub agents
   */
  async fetchGitHubAgents(): Promise<GitHubAgentFile[]> {
    try {
      return await invoke("fetch_github_agents");
    } catch (error) {
      console.error("Failed to fetch GitHub agents:", error);
      throw error;
    }
  },

  /**
   * Fetches content of a GitHub agent
   */
  async fetchGitHubAgentContent(downloadUrl: string): Promise<AgentExport> {
    try {
      return await invoke("fetch_github_agent_content", { downloadUrl });
    } catch (error) {
      console.error("Failed to fetch GitHub agent content:", error);
      throw error;
    }
  },

  /**
   * Imports an agent from GitHub
   */
  async importAgentFromGitHub(downloadUrl: string): Promise<Agent> {
    try {
      return await invoke("import_agent_from_github", { downloadUrl });
    } catch (error) {
      console.error("Failed to import agent from GitHub:", error);
      throw error;
    }
  },

  /**
   * Gets Claude settings
   */
  async getClaudeSettings(): Promise<ClaudeSettings> {
    try {
      return await invoke("get_claude_settings");
    } catch (error) {
      console.error("Failed to get Claude settings:", error);
      throw error;
    }
  },

  /**
   * Opens a new session
   */
  async openNewSession(path?: string): Promise<string> {
    try {
      return await invoke("open_new_session", { path });
    } catch (error) {
      console.error("Failed to open new session:", error);
      throw error;
    }
  },

  /**
   * Gets the system prompt
   */
  async getSystemPrompt(): Promise<string> {
    try {
      return await invoke("get_system_prompt");
    } catch (error) {
      console.error("Failed to get system prompt:", error);
      throw error;
    }
  },

  /**
   * Checks Claude version
   */
  async checkClaudeVersion(): Promise<ClaudeVersionStatus> {
    try {
      return await invoke("check_claude_version");
    } catch (error) {
      console.error("Failed to check Claude version:", error);
      throw error;
    }
  },

  /**
   * Saves the system prompt
   */
  async saveSystemPrompt(content: string): Promise<string> {
    try {
      return await invoke("save_system_prompt", { content });
    } catch (error) {
      console.error("Failed to save system prompt:", error);
      throw error;
    }
  },

  /**
   * Saves Claude settings
   */
  async saveClaudeSettings(settings: ClaudeSettings): Promise<string> {
    try {
      return await invoke("save_claude_settings", { settings });
    } catch (error) {
      console.error("Failed to save Claude settings:", error);
      throw error;
    }
  },

  /**
   * Finds CLAUDE.md files in a project
   */
  async findClaudeMdFiles(projectPath: string): Promise<ClaudeMdFile[]> {
    try {
      return await invoke("find_claude_md_files", { projectPath });
    } catch (error) {
      console.error("Failed to find CLAUDE.md files:", error);
      throw error;
    }
  },

  /**
   * Reads a CLAUDE.md file
   */
  async readClaudeMdFile(filePath: string): Promise<string> {
    try {
      return await invoke("read_claude_md_file", { filePath });
    } catch (error) {
      console.error("Failed to read CLAUDE.md file:", error);
      throw error;
    }
  },

  /**
   * Saves a CLAUDE.md file
   */
  async saveClaudeMdFile(filePath: string, content: string): Promise<string> {
    try {
      return await invoke("save_claude_md_file", { filePath, content });
    } catch (error) {
      console.error("Failed to save CLAUDE.md file:", error);
      throw error;
    }
  },

  /**
   * Lists all agents
   */
  async listAgents(): Promise<Agent[]> {
    try {
      return await invoke("list_agents");
    } catch (error) {
      console.error("Failed to list agents:", error);
      throw error;
    }
  },

  /**
   * Creates a new agent
   */
  async createAgent(
    name: string, 
    icon: string, 
    system_prompt: string, 
    default_task?: string, 
    model?: string
  ): Promise<Agent> {
    try {
      return await invoke("create_agent", { 
        name, 
        icon, 
        system_prompt, 
        default_task, 
        model 
      });
    } catch (error) {
      console.error("Failed to create agent:", error);
      throw error;
    }
  },

  /**
   * Updates an existing agent
   */
  async updateAgent(
    id: number, 
    name: string, 
    icon: string, 
    system_prompt: string, 
    default_task?: string, 
    model?: string
  ): Promise<Agent> {
    try {
      return await invoke("update_agent", { 
        id, 
        name, 
        icon, 
        system_prompt, 
        default_task, 
        model 
      });
    } catch (error) {
      console.error("Failed to update agent:", error);
      throw error;
    }
  },

  /**
   * Deletes an agent
   */
  async deleteAgent(id: number): Promise<void> {
    try {
      return await invoke("delete_agent", { id });
    } catch (error) {
      console.error("Failed to delete agent:", error);
      throw error;
    }
  },

  /**
   * Gets a specific agent
   */
  async getAgent(id: number): Promise<Agent> {
    try {
      return await invoke("get_agent", { id });
    } catch (error) {
      console.error("Failed to get agent:", error);
      throw error;
    }
  },

  /**
   * Exports an agent
   */
  async exportAgent(id: number): Promise<string> {
    try {
      return await invoke("export_agent", { id });
    } catch (error) {
      console.error("Failed to export agent:", error);
      throw error;
    }
  },

  /**
   * Imports an agent from JSON data
   */
  async importAgent(jsonData: string): Promise<Agent> {
    try {
      return await invoke("import_agent", { jsonData });
    } catch (error) {
      console.error("Failed to import agent:", error);
      throw error;
    }
  },

  /**
   * Imports an agent from a file
   */
  async importAgentFromFile(filePath: string): Promise<Agent> {
    try {
      return await invoke("import_agent_from_file", { filePath });
    } catch (error) {
      console.error("Failed to import agent from file:", error);
      throw error;
    }
  },

  /**
   * Executes an agent
   */
  async executeAgent(agentId: number, projectPath: string, task: string, model?: string): Promise<number> {
    try {
      return await invoke("execute_agent", { agentId, projectPath, task, model });
    } catch (error) {
      console.error("Failed to execute agent:", error);
      throw error;
    }
  },

  /**
   * Lists agent runs
   */
  async listAgentRuns(agentId?: number): Promise<AgentRunWithMetrics[]> {
    try {
      return await invoke("list_agent_runs", { agentId });
    } catch (error) {
      console.error("Failed to list agent runs:", error);
      throw error;
    }
  },

  /**
   * Gets a specific agent run
   */
  async getAgentRun(id: number): Promise<AgentRunWithMetrics> {
    try {
      return await invoke("get_agent_run", { id });
    } catch (error) {
      console.error("Failed to get agent run:", error);
      throw error;
    }
  },

  /**
   * Gets agent run with real-time metrics
   */
  async getAgentRunWithRealTimeMetrics(id: number): Promise<AgentRunWithMetrics> {
    try {
      return await invoke("get_agent_run_with_real_time_metrics", { id });
    } catch (error) {
      console.error("Failed to get agent run with real-time metrics:", error);
      throw error;
    }
  },

  /**
   * Lists running agent sessions
   */
  async listRunningAgentSessions(): Promise<AgentRun[]> {
    try {
      return await invoke("list_running_sessions");
    } catch (error) {
      console.error("Failed to list running agent sessions:", error);
      throw error;
    }
  },

  /**
   * Kills an agent session
   */
  async killAgentSession(runId: number): Promise<boolean> {
    try {
      return await invoke("kill_agent_session", { runId });
    } catch (error) {
      console.error("Failed to kill agent session:", error);
      throw error;
    }
  },

  /**
   * Gets session status
   */
  async getSessionStatus(runId: number): Promise<string | null> {
    try {
      return await invoke("get_session_status", { runId });
    } catch (error) {
      console.error("Failed to get session status:", error);
      throw error;
    }
  },

  /**
   * Cleans up finished processes
   */
  async cleanupFinishedProcesses(): Promise<number[]> {
    try {
      return await invoke("cleanup_finished_processes");
    } catch (error) {
      console.error("Failed to cleanup finished processes:", error);
      throw error;
    }
  },

  /**
   * Gets session output
   */
  async getSessionOutput(runId: number): Promise<string> {
    try {
      return await invoke("get_session_output", { runId });
    } catch (error) {
      console.error("Failed to get session output:", error);
      throw error;
    }
  },

  /**
   * Gets live session output
   */
  async getLiveSessionOutput(runId: number): Promise<string> {
    try {
      return await invoke("get_live_session_output", { runId });
    } catch (error) {
      console.error("Failed to get live session output:", error);
      throw error;
    }
  },

  /**
   * Streams session output
   */
  async streamSessionOutput(runId: number): Promise<void> {
    try {
      return await invoke("stream_session_output", { runId });
    } catch (error) {
      console.error("Failed to stream session output:", error);
      throw error;
    }
  },

  /**
   * Loads session history
   */
  async loadSessionHistory(sessionId: string, projectId: string): Promise<any[]> {
    try {
      return await invoke("load_session_history", { sessionId, projectId });
    } catch (error) {
      console.error("Failed to load session history:", error);
      throw error;
    }
  },

  /**
   * Executes Claude Code
   */
  async executeClaudeCode(projectPath: string, prompt: string, model: string): Promise<void> {
    try {
      return await invoke("execute_claude_code", { projectPath, prompt, model });
    } catch (error) {
      console.error("Failed to execute Claude Code:", error);
      throw error;
    }
  },

  /**
   * Continues Claude Code execution
   */
  async continueClaudeCode(projectPath: string, prompt: string, model: string): Promise<void> {
    try {
      return await invoke("continue_claude_code", { projectPath, prompt, model });
    } catch (error) {
      console.error("Failed to continue Claude Code:", error);
      throw error;
    }
  },

  /**
   * Resumes Claude Code execution
   */
  async resumeClaudeCode(projectPath: string, sessionId: string, prompt: string, model: string): Promise<void> {
    try {
      return await invoke("resume_claude_code", { projectPath, sessionId, prompt, model });
    } catch (error) {
      console.error("Failed to resume Claude Code:", error);
      throw error;
    }
  },

  /**
   * Cancels Claude execution
   */
  async cancelClaudeExecution(sessionId?: string): Promise<void> {
    try {
      return await invoke("cancel_claude_execution", { sessionId });
    } catch (error) {
      console.error("Failed to cancel Claude execution:", error);
      throw error;
    }
  },

  /**
   * Lists running Claude sessions
   */
  async listRunningClaudeSessions(): Promise<any[]> {
    try {
      return await invoke("list_running_claude_sessions");
    } catch (error) {
      console.error("Failed to list running Claude sessions:", error);
      throw error;
    }
  },

  /**
   * Gets Claude session output
   */
  async getClaudeSessionOutput(sessionId: string): Promise<string> {
    try {
      return await invoke("get_claude_session_output", { sessionId });
    } catch (error) {
      console.error("Failed to get Claude session output:", error);
      throw error;
    }
  },

  /**
   * Lists directory contents
   */
  async listDirectoryContents(directoryPath: string): Promise<FileEntry[]> {
    try {
      return await invoke("list_directory_contents", { directoryPath });
    } catch (error) {
      console.error("Failed to list directory contents:", error);
      throw error;
    }
  },

  /**
   * Searches files
   */
  async searchFiles(basePath: string, query: string): Promise<FileEntry[]> {
    try {
      return await invoke("search_files", { basePath, query });
    } catch (error) {
      console.error("Failed to search files:", error);
      throw error;
    }
  },

  /**
   * Gets usage statistics
   */
  async getUsageStats(): Promise<UsageStats> {
    try {
      return await invoke("get_usage_stats");
    } catch (error) {
      console.error("Failed to get usage stats:", error);
      throw error;
    }
  },

  /**
   * Gets usage by date range
   */
  async getUsageByDateRange(startDate: string, endDate: string): Promise<UsageStats> {
    try {
      return await invoke("get_usage_by_date_range", { startDate, endDate });
    } catch (error) {
      console.error("Failed to get usage by date range:", error);
      throw error;
    }
  },

  /**
   * Gets session statistics
   */
  async getSessionStats(
    since?: string,
    until?: string,
    order?: "asc" | "desc"
  ): Promise<ProjectUsage[]> {
    try {
      return await invoke("get_session_stats", { since, until, order });
    } catch (error) {
      console.error("Failed to get session stats:", error);
      throw error;
    }
  },

  /**
   * Gets usage details
   */
  async getUsageDetails(limit?: number): Promise<UsageEntry[]> {
    try {
      return await invoke("get_usage_details", { limit });
    } catch (error) {
      console.error("Failed to get usage details:", error);
      throw error;
    }
  },

  /**
   * Creates a checkpoint
   */
  async createCheckpoint(
    sessionId: string,
    projectId: string,
    projectPath: string,
    messageIndex?: number,
    description?: string
  ): Promise<CheckpointResult> {
    try {
      return await invoke("create_checkpoint", { 
        sessionId, 
        projectId, 
        projectPath, 
        messageIndex, 
        description 
      });
    } catch (error) {
      console.error("Failed to create checkpoint:", error);
      throw error;
    }
  },

  /**
   * Restores a checkpoint
   */
  async restoreCheckpoint(
    checkpointId: string,
    sessionId: string,
    projectId: string,
    projectPath: string
  ): Promise<CheckpointResult> {
    try {
      return await invoke("restore_checkpoint", { 
        checkpointId, 
        sessionId, 
        projectId, 
        projectPath 
      });
    } catch (error) {
      console.error("Failed to restore checkpoint:", error);
      throw error;
    }
  },

  /**
   * Lists checkpoints
   */
  async listCheckpoints(
    sessionId: string,
    projectId: string,
    projectPath: string
  ): Promise<Checkpoint[]> {
    try {
      return await invoke("list_checkpoints", { sessionId, projectId, projectPath });
    } catch (error) {
      console.error("Failed to list checkpoints:", error);
      throw error;
    }
  },

  /**
   * Forks from a checkpoint
   */
  async forkFromCheckpoint(
    checkpointId: string,
    sessionId: string,
    projectId: string,
    projectPath: string,
    newSessionId: string,
    description?: string
  ): Promise<CheckpointResult> {
    try {
      return await invoke("fork_from_checkpoint", { 
        checkpointId, 
        sessionId, 
        projectId, 
        projectPath, 
        newSessionId, 
        description 
      });
    } catch (error) {
      console.error("Failed to fork from checkpoint:", error);
      throw error;
    }
  },

  /**
   * Gets session timeline
   */
  async getSessionTimeline(
    sessionId: string,
    projectId: string,
    projectPath: string
  ): Promise<SessionTimeline> {
    try {
      return await invoke("get_session_timeline", { sessionId, projectId, projectPath });
    } catch (error) {
      console.error("Failed to get session timeline:", error);
      throw error;
    }
  },

  /**
   * Updates checkpoint settings
   */
  async updateCheckpointSettings(
    sessionId: string,
    projectId: string,
    projectPath: string,
    autoCheckpointEnabled: boolean,
    checkpointStrategy: CheckpointStrategy
  ): Promise<void> {
    try {
      return await invoke("update_checkpoint_settings", { 
        sessionId, 
        projectId, 
        projectPath, 
        autoCheckpointEnabled, 
        checkpointStrategy 
      });
    } catch (error) {
      console.error("Failed to update checkpoint settings:", error);
      throw error;
    }
  },

  /**
   * Gets checkpoint diff
   */
  async getCheckpointDiff(
    fromCheckpointId: string,
    toCheckpointId: string,
    sessionId: string,
    projectId: string
  ): Promise<CheckpointDiff> {
    try {
      return await invoke("get_checkpoint_diff", { 
        fromCheckpointId, 
        toCheckpointId, 
        sessionId, 
        projectId 
      });
    } catch (error) {
      console.error("Failed to get checkpoint diff:", error);
      throw error;
    }
  },

  /**
   * Tracks checkpoint message
   */
  async trackCheckpointMessage(
    sessionId: string,
    projectId: string,
    projectPath: string,
    message: string
  ): Promise<void> {
    try {
      return await invoke("track_checkpoint_message", { 
        sessionId, 
        projectId, 
        projectPath, 
        message 
      });
    } catch (error) {
      console.error("Failed to track checkpoint message:", error);
      throw error;
    }
  },

  /**
   * Checks auto checkpoint
   */
  async checkAutoCheckpoint(
    sessionId: string,
    projectId: string,
    projectPath: string,
    message: string
  ): Promise<boolean> {
    try {
      return await invoke("check_auto_checkpoint", { 
        sessionId, 
        projectId, 
        projectPath, 
        message 
      });
    } catch (error) {
      console.error("Failed to check auto checkpoint:", error);
      throw error;
    }
  },

  /**
   * Cleans up old checkpoints
   */
  async cleanupOldCheckpoints(
    sessionId: string,
    projectId: string,
    projectPath: string,
    keepCount: number
  ): Promise<number> {
    try {
      return await invoke("cleanup_old_checkpoints", { 
        sessionId, 
        projectId, 
        projectPath, 
        keepCount 
      });
    } catch (error) {
      console.error("Failed to cleanup old checkpoints:", error);
      throw error;
    }
  },

  /**
   * Gets checkpoint settings
   */
  async getCheckpointSettings(
    sessionId: string,
    projectId: string,
    projectPath: string
  ): Promise<{
    auto_checkpoint_enabled: boolean;
    checkpoint_strategy: CheckpointStrategy;
    total_checkpoints: number;
    current_checkpoint_id?: string;
  }> {
    try {
      return await invoke("get_checkpoint_settings", { sessionId, projectId, projectPath });
    } catch (error) {
      console.error("Failed to get checkpoint settings:", error);
      throw error;
    }
  },

  /**
   * Clears checkpoint manager
   */
  async clearCheckpointManager(sessionId: string): Promise<void> {
    try {
      return await invoke("clear_checkpoint_manager", { sessionId });
    } catch (error) {
      console.error("Failed to clear checkpoint manager:", error);
      throw error;
    }
  },

  /**
   * Adds an MCP server
   */
  async mcpAdd(
    name: string,
    transport: string,
    command?: string,
    args: string[] = [],
    env: Record<string, string> = {},
    url?: string,
    scope: string = "local"
  ): Promise<AddServerResult> {
    try {
      return await invoke("mcp_add", { name, transport, command, args, env, url, scope });
    } catch (error) {
      console.error("Failed to add MCP server:", error);
      throw error;
    }
  },

  /**
   * Lists MCP servers
   */
  async mcpList(): Promise<MCPServer[]> {
    try {
      return await invoke("mcp_list");
    } catch (error) {
      console.error("Failed to list MCP servers:", error);
      throw error;
    }
  },

  /**
   * Gets a specific MCP server
   */
  async mcpGet(name: string): Promise<MCPServer> {
    try {
      return await invoke("mcp_get", { name });
    } catch (error) {
      console.error("Failed to get MCP server:", error);
      throw error;
    }
  },

  /**
   * Removes an MCP server
   */
  async mcpRemove(name: string): Promise<string> {
    try {
      return await invoke("mcp_remove", { name });
    } catch (error) {
      console.error("Failed to remove MCP server:", error);
      throw error;
    }
  },

  /**
   * Adds an MCP server from JSON
   */
  async mcpAddJson(name: string, jsonConfig: string, scope: string = "local"): Promise<AddServerResult> {
    try {
      return await invoke("mcp_add_json", { name, jsonConfig, scope });
    } catch (error) {
      console.error("Failed to add MCP server from JSON:", error);
      throw error;
    }
  },

  /**
   * Adds MCP servers from Claude Desktop
   */
  async mcpAddFromClaudeDesktop(scope: string = "local"): Promise<ImportResult> {
    try {
      return await invoke("mcp_add_from_claude_desktop", { scope });
    } catch (error) {
      console.error("Failed to add MCP servers from Claude Desktop:", error);
      throw error;
    }
  },

  /**
   * Serves MCP
   */
  async mcpServe(): Promise<string> {
    try {
      return await invoke("mcp_serve");
    } catch (error) {
      console.error("Failed to serve MCP:", error);
      throw error;
    }
  },

  /**
   * Tests MCP connection
   */
  async mcpTestConnection(name: string): Promise<string> {
    try {
      return await invoke("mcp_test_connection", { name });
    } catch (error) {
      console.error("Failed to test MCP connection:", error);
      throw error;
    }
  },

  /**
   * Resets MCP project choices
   */
  async mcpResetProjectChoices(): Promise<string> {
    try {
      return await invoke("mcp_reset_project_choices");
    } catch (error) {
      console.error("Failed to reset MCP project choices:", error);
      throw error;
    }
  },

  /**
   * Gets MCP server status
   */
  async mcpGetServerStatus(): Promise<Record<string, ServerStatus>> {
    try {
      return await invoke("mcp_get_server_status");
    } catch (error) {
      console.error("Failed to get MCP server status:", error);
      throw error;
    }
  },

  /**
   * Reads MCP project config
   */
  async mcpReadProjectConfig(projectPath: string): Promise<MCPProjectConfig> {
    try {
      return await invoke("mcp_read_project_config", { projectPath });
    } catch (error) {
      console.error("Failed to read MCP project config:", error);
      throw error;
    }
  },

  /**
   * Saves MCP project config
   */
  async mcpSaveProjectConfig(projectPath: string, config: MCPProjectConfig): Promise<string> {
    try {
      return await invoke("mcp_save_project_config", { projectPath, config });
    } catch (error) {
      console.error("Failed to save MCP project config:", error);
      throw error;
    }
  },

  /**
   * Gets Claude binary path
   */
  async getClaudeBinaryPath(): Promise<string | null> {
    try {
      return await invoke("get_claude_binary_path");
    } catch (error) {
      console.error("Failed to get Claude binary path:", error);
      throw error;
    }
  },

  /**
   * Sets Claude binary path
   */
  async setClaudeBinaryPath(path: string): Promise<void> {
    try {
      return await invoke("set_claude_binary_path", { path });
    } catch (error) {
      console.error("Failed to set Claude binary path:", error);
      throw error;
    }
  },

  /**
   * Lists Claude installations
   */
  async listClaudeInstallations(): Promise<ClaudeInstallation[]> {
    try {
      return await invoke("list_claude_installations");
    } catch (error) {
      console.error("Failed to list Claude installations:", error);
      throw error;
    }
  }
};
