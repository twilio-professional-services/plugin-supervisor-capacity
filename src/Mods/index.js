import * as ModModules from "./ModModules"

export { default as TestComponent } from "./Components/TestComponent"

export const applyMods = (flex, manager, config = {}) => {
  for (let key in ModModules) {
    let modModule = ModModules[key]
    if ((modModule.default || config[key] === true) && config[key] !== false) {
      if (modModule.apply) {
        try {
          modModule.apply(flex, manager);
        } catch(e) {
          console.error(`Mod ${key} is misconfigured: ${e.message}`, e)
        }
      } else {
        console.error(`Mod ${key} is misconfigured: "apply" method does not exist.`)
      }
    }
  }
}
