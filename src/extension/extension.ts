import * as vs from "vscode";
import { TestCodeActionProvider } from "./code_actions/test_code_action_provider";

const DART_MODE: vs.DocumentFilter = { language: "dart", scheme: "file" };
export const FLUTTER_SUPPORTS_ATTACH = "dart-code:flutterSupportsAttach";
export const SERVICE_EXTENSION_CONTEXT_PREFIX = "dart-code:serviceExtension.";
export const SERVICE_CONTEXT_PREFIX = "dart-code:service.";

export function activate(context: vs.ExtensionContext) {
	const codeActionProvider = new TestCodeActionProvider();
	context.subscriptions.push(codeActionProvider);
	context.subscriptions.push(vs.languages.registerCodeActionsProvider(DART_MODE, codeActionProvider));
}
