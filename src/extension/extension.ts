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

	// Make the extension host busier.
	function busy() {
		// Block the extension host periodically for a short period
		// (this could be other extensions doing computation or sync fs work)
		for (let i = 0; i < 10000000; i++) {
		}
		setTimeout(busy, 5);
	}
	setTimeout(busy, 0);
}
