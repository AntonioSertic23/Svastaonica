/**
 * Decap custom widget: visual multiselect of catalog products (thumbnail + name).
 * Loads options from /admin/data/products.json (regenerate via npm run cms:index).
 * Stores an array of numeric product ids.
 * Optional field props: max (number) — caps how many products can be selected.
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

  function getMax(field) {
    if (!field || typeof field.get !== "function") return Infinity;
    var max = Number(field.get("max"));
    return Number.isFinite(max) && max > 0 ? max : Infinity;
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
      var max = getMax(this.props.field);

      if (idx >= 0) {
        selected.splice(idx, 1);
      } else {
        if (selected.length >= max) return;
        selected.push(id);
      }
      this.props.onChange(selected);
    },

    isValid: function () {
      var selected = toIdArray(this.props.value);
      var max = getMax(this.props.field);
      var required = this.props.field.get("required") !== false;

      if (required && selected.length === 0) return false;
      if (Number.isFinite(max) && max < Infinity && selected.length > max) {
        return false;
      }
      // For homepage featured: require exactly max when max is set and required
      if (required && Number.isFinite(max) && max < Infinity && selected.length !== max) {
        return { error: "Odaberi točno " + max + " proizvoda." };
      }
      return true;
    },

    render: function () {
      var selected = toIdArray(this.props.value);
      var options = this.state.options;
      var max = getMax(this.props.field);
      var atMax = selected.length >= max;
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
        Number.isFinite(max) && max < Infinity
          ? h(
              "p",
              {
                style: {
                  margin: "0 0 0.75rem",
                  fontSize: "0.9rem",
                  opacity: 0.8,
                },
              },
              "Odabrano: " + selected.length + " / " + max
            )
          : null,
        options.map(
          function (opt) {
            var value = Number(opt.value);
            if (Number.isFinite(currentId) && value === currentId) return null;
            var active = selected.indexOf(value) >= 0;
            var disabled = !active && atMax;
            return h(
              "button",
              {
                type: "button",
                key: value,
                disabled: disabled,
                className:
                  "sv-icon-multiselect__item sv-product-multiselect__item" +
                  (active ? " is-selected" : "") +
                  (disabled ? " is-disabled" : ""),
                title: disabled
                  ? "Već su odabrana " + max + " mjesta — prvo makni jedno."
                  : opt.label,
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
