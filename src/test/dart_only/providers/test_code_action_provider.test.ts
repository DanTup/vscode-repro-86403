import * as path from "path";
import * as vs from "vscode";

const dartCodeExtensionIdentifier = "issue-repro.dart-code-issue-repro";
const ext = vs.extensions.getExtension(dartCodeExtensionIdentifier);
const testFolder = path.join(ext.extensionPath, "src/test");
export const helloWorldFolder = vs.Uri.file(path.join(testFolder, "test_projects/hello_world"));
export const emptyFile = vs.Uri.file(path.join(helloWorldFolder.fsPath, "lib/empty.dart"));
export const helloWorldTestMainFile = vs.Uri.file(path.join(helloWorldFolder.fsPath, "test/basic_test.dart"));


describe(`test_code_actions`, () => {
	console.info(`Starting tests!`);
	before("activate", () => ext.activate());

	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].forEach((attempt) => {
		it(`includes run/debug actions for tests (${attempt})`, async () => {
			const doc = await vs.workspace.openTextDocument(helloWorldTestMainFile);
			await vs.window.showTextDocument(doc);

			const codeActions = await (vs.commands.executeCommand("vscode.executeCodeActionProvider", doc.uri, new vs.Range(new vs.Position(0, 0), new vs.Position(0, 0))) as Thenable<vs.CodeAction[]>);
			console.info(`On attempt ${attempt}, got ${codeActions.length} code actions`);

			for (const ca of codeActions) {
				if (!ca.command) {
					console.error(`On attempt ${attempt}, got a code action without any command! ${JSON.stringify(ca, undefined, 4)}`);
					throw new Error(`On attempt ${attempt}, got a code action without any command! ${JSON.stringify(ca, undefined, 4)}`);
				}
			}
		});
	});
});
