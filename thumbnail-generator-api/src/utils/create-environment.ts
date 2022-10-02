import { ObjectEnhanced } from './object-enhanced';

export type stagesType = 'dev' | 'qa' | 'prod';

export class ConfigurationEnvironment<Props extends object> {
  constructor(
    props: Props,
    private stage: stagesType,
    private environment = new Map<stagesType, Props>(),
    private stagesCreated: stagesType[] = ['dev', 'prod', 'qa'],
  ) {
    this.stage = stage;

    this.setEnvironment(props);
  }

  public getEnvironment(stage: stagesType = this.stage): Props {
    return this.getAllEnvironments()[stage];
  }

  public getAllEnvironments() {
    return {
      ...ObjectEnhanced.fromEntries<Record<stagesType, Props>>([
        ...this.environment,
      ]),
    };
  }

  private setEnvironment(props: Props) {
    this.stagesCreated.forEach((s) => {
      const entries = Object.entries(props);
      const environment = entries.reduce(
        (p, c) => ({ ...p, [c[0]]: this.addStage(c[1]) }),
        {},
      );
      this.environment.set(s, {
        ...(environment as Props),
      });
    });
  }

  public setSpecificStage(stage: stagesType, props: Partial<Props>) {
    this.environment.set(stage, {
      ...this.getEnvironment(stage),
      ...props,
    });
  }

  private addStage(value: string) {
    return [value, this.stage].join('--');
  }
}
