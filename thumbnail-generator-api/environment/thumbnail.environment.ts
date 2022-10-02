import {
  stagesType,
  ConfigurationEnvironment,
} from '../src/utils/create-environment';

interface EnvironmentProps {
  BUCKET_CONVERT_IMAGE: string;
  BUCKET_PROCESSING_IMAGE: string;
}

export class ThumbnailEnvironment {
  public config: ConfigurationEnvironment<EnvironmentProps>;

  constructor(currentStage: stagesType) {
    this.config = new ConfigurationEnvironment<EnvironmentProps>(
      {
        BUCKET_CONVERT_IMAGE: 'bucket-convert-image',
        BUCKET_PROCESSING_IMAGE: 'bucket-processing-image',
      },
      currentStage,
    );
  }
}

export type ENVIRONMENT_TYPE = {
  projectName: string;
  stage: stagesType;
};
