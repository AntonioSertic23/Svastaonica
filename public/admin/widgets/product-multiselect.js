/**
 * Decap custom widget: visual multiselect of catalog products (thumbnail + name).
 * Loads options from /admin/data/products.json (regenerate via npm run cms:index).
 * Stores an array of numeric product ids.
 */
(function () {
  function toIdArray(value) {
    if (value == null || value === "") return [];
    var list =
      typeof value.toJS === "function"
        ? value.toJS()
        : Array.isArray(value)
          ? value
          : [value];
    return list
      .map(function (v) {
        return typeof v === "object" && v != null ? v.id ?? v.value : v;
      })
      .map(Number)
      .filter(function (n) {
        return Number.isFinite(n);
      });
  }

  var ProductMultiselectControl = createClass({
    getInitialState: function () {
      return { options: [], loading: true, error: null };
    },

    componentDidMount: function () {
      var self = this;
      fetch("/admin/data/products.json", { cache: "no-store" })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.json();
        })
        .then(function (data) {
          var options = Array.isArray(data) ? data : [];
          self.setState({ options: options, loading: false });
        })
        .catch(function (err) {
          self.setState({
            loading: false,
            error: "Ne mogu učitati popis proizvoda. Pokreni npm run cms:index.",
          });
          console.warn("[product-multiselect]", err);
        });
    },

    handleToggle: function (optionValue) {
      var id = Number(optionValue);
      var selected = toIdArray(this.props.value);
      var idx = selected.indexOf(id);
      if (idx >= 0) selected.splice(idx, 1);
      else selected.push(id);
      this.props.onChange(selected);
    },

    isValid: function () {
      if (this.props.field.get("required") === false) return true;
      return toIdArray(this.props.value).length > 0;
    },

    render: function () {
      var selected = toIdArray(this.props.value);
      var options = this.state.options;
      var currentId = null;
      try {
        var entryData = this.props.entry && this.props.entry.get("data");
        if (entryData) currentId = Number(entryData.get("id"));
      } catch (e) {
        /* ignore */
      }

      if (this.state.loading) {
        return h(
          "div",
          { className: this.props.classNameWrapper },
          "Učitavanje proizvoda…"
        );
      }

      if (this.state.error) {
        return h(
          "div",
          { className: this.props.classNameWrapper },
          this.state.error
        );
      }

      return h(
        "div",
        {
          id: this.props.forID,
          className:
            "sv-icon-multiselect sv-product-multiselect " +
            (this.props.classNameWrapper || ""),
        },
        options.map(
          function (opt) {
            var value = Number(opt.value);
            if (Number.isFinite(currentId) && value === currentId) return null;
            var active = selected.indexOf(value) >= 0;
            return h(
              "button",
              {
                type: "button",
                key: value,
                className:
                  "sv-icon-multiselect__item sv-product-multiselect__item" +
                  (active ? " is-selected" : ""),
                title: opt.label,
                "aria-pressed": active ? "true" : "false",
                onClick: this.handleToggle.bind(this, value),
              },
              h("img", {
                src: opt.image,
                alt: "",
                className: "sv-product-multiselect__img",
              }),
              h(
                "span",
                { className: "sv-icon-multiselect__label" },
                opt.label
              )
            );
          }.bind(this)
        )
      );
    },
  });

  var ProductMultiselectPreview = createClass({
    render: function () {
      var selected = toIdArray(this.props.value);
      if (!selected.length) return h("span", {}, "—");
      return h("span", {}, selected.join(", "));
    },
  });

  CMS.registerWidget(
    "product-multiselect",
    ProductMultiselectControl,
    ProductMultiselectPreview
  );
})();
