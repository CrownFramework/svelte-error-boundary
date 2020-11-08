export function createBoundary(Component) {
  if (Component.$$render) {
    let render = Component.$$render;
    Component.$$render = (result, props, bindings, slots) => {
      try {
        return render(result, props, bindings, slots);
      } catch (e) {
        return render(result, { error: e }, bindings, {});
      }
    };

    return Component;
  }

  return class errorBoundary extends Component {
    constructor(config) {
      var error = null;
      config.props.$$slots.default = config.props.$$slots.default.map(
        (x) => (...args) => {
          try {
            return x(...args);
          } catch (e) {
            error = e;
          }
        }
      );
      super(config);
      if (error) {
        this.$set({ error: error });
      }
    }
  };
}
