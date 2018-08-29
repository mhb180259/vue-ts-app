import { createDecorator } from 'vue-class-component';


export const NoCache = createDecorator((options: any, key: string) => {
  options.computed[key].cache = false;
});
