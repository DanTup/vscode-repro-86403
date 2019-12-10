import { CancellationToken, commands, Event, EventEmitter, Range, TextDocument, CodeActionProvider, CodeActionContext, CodeAction, CodeActionKind } from "vscode";

export class TestCodeActionProvider implements CodeActionProvider, IAmDisposable {
	private disposables: IAmDisposable[] = [];
	private onDidChangeCodeLensesEmitter: EventEmitter<void> = new EventEmitter<void>();
	public readonly onDidChangeCodeLenses: Event<void> = this.onDidChangeCodeLensesEmitter.event;

	constructor() {
		console.log(`Creating code action provider`);
		this.disposables.push(commands.registerCommand("_dart2.startDebuggingTestFromOutline", (test: TestOutlineInfo, launchTemplate: any | undefined) => {
			// Nothing
		}));
		console.log(`Done!`);
	}

	public provideCodeActions(document: TextDocument, range: Range, context: CodeActionContext, token: CancellationToken): CodeAction[] | undefined {
		const res: CodeAction[] = [];
		for (let i = 0; i < 30; i++) {
			const ca = new CodeAction(`Test code action ${i}`, CodeActionKind.Source);
			res.push(ca);
			ca.command = {
				arguments: [{
					file: "Test file",
					fullName: "Test name",
					isGroup: false,
					length: 2,
					offset: 1,
				} as TestOutlineInfo],
				command: "_dart2.startDebuggingTestFromOutline",
				title: "Run",
			};
		}
		return res;
	}

	public dispose(): any {
		this.disposables.forEach((d) => d.dispose());
	}
}

interface IAmDisposable {
	dispose(): void | Promise<void>;

}

interface TestOutlineInfo {
	fullName: string;
	file: string;
	offset: number;
	length: number;
	isGroup: boolean;
}
