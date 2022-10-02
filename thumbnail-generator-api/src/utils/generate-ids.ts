const conSep = '-';

export class CreateConstructsFormat {
  constructor(
    private readonly project: string,
    private readonly stage: string,
  ) {}

  public getConstructId = (constructId: string): string =>
    [this.project, constructId, this.stage]
      .filter((v) => v != null)
      .join(conSep);

  public getConstructName = (constructId: string): string =>
    this.getConstructId(constructId);
}
