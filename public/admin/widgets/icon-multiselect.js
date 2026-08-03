/**
 * Decap custom widget: visual select of fixed icon assets.
 * Config options: [{ label, value, image? }] — image defaults to /assets/img/ui/{value}.png
 * multiple: true (default) → array; multiple: false → single value (or "").
 */
(function () {
  function coerceValue(raw) {
    if (typeof raw === "number" && Number.isFinite(raw)) return raw;
    if (typeof raw === "string" && /^-?\d+$/.test(raw.trim())) return Number(raw);
    return String(raw);
  }

  function isMultiple(field) {
    var m = field.get("multiple");
    return m !== false;
  }

  function toArray(value) {
    if (value == null || value === "") return [];
    if (typeof value.toJS === "function") return value.toJS().map(coerceValue);
    if (Array.isArray(value)) return value.map(coerceValue);
    return [coerceValue(value)];
  }

  function sameValue(a, b) {
    return a === b || String(a) === String(b);
  }

  function getOptions(field) {
    var raw = field.get("options");
    if (!raw) return [];
    var list = typeof raw.toJS === "function" ? raw.toJS() : raw;
    if (!Array.isArray(list)) return [];
    return list.map(function (opt) {
      if (typeof opt === "string" || typeof opt === "number") {
        var simple = coerceValue(opt);
        return {
          label: String(opt),
          value: simple,
          image: "/assets/img/ui/" + String(opt) + ".png",
        };
      }
      var value = coerceValue(
        opt.value != null ? opt.value : opt.label != null ? opt.label : ""
      );
      return {
        label: opt.label != null ? String(opt.label) : String(value),
        value: value,
        image: opt.image || "/assets/img/ui/" + String(value) + ".png",
      };
    });
  }

  var IconMultiselectControl = createClass({
    handleToggle: function (optionValue) {
      if (!isMultiple(this.props.field)) {
        var current = this.props.value;
        if (current != null && current !== "" && sameValue(coerceValue(current), optionValue)) {
          this.props.onChange("");
        } else {
          this.props.onChange(optionValue);
        }
        return;
      }

      var selected = toArray(this.props.value);
      var idx = -1;
      for (var i = 0; i < selected.length; i++) {
        if (sameValue(selected[i], optionValue)) {
          idx = i;
          break;
        }
      }
      if (idx >= 0) selected.splice(idx, 1);
      else selected.push(optionValue);
      this.props.onChange(selected);
    },

    isValid: function () {
      if (this.props.field.get("required") === false) return true;
      if (!isMultiple(this.props.field)) {
        var v = this.props.value;
        return v != null && String(v).trim() !== "";
      }
      return toArray(this.props.value).length > 0;
    },

    render: function () {
      var selected = isMultiple(this.props.field)
        ? toArray(this.props.value)
        : this.props.value != null && this.props.value !== ""
          ? [coerceValue(this.props.value)]
          : [];
      var options = getOptions(this.props.field);

      return h(
        "div",
        {
          id: this.props.forID,
          className: "sv-icon-multiselect " + (this.props.classNameWrapper || ""),
        },
        options.map(
          function (opt) {
            var active = selected.some(function (v) {
              return sameValue(v, opt.value);
            });
            return h(
              "button",
              {
                type: "button",
                key: String(opt.value),
                className:
                  "sv-icon-multiselect__item" +
                  (active ? " is-selected" : ""),
                title: opt.label,
                "aria-pressed": active ? "true" : "false",
                onClick: this.handleToggle.bind(this, opt.value),
              },
              h("img", {
                src: opt.image,
                alt: "",
                className: "sv-icon-multiselect__img",
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

  var IconMultiselectPreview = createClass({
    render: function () {
      var selected = toArray(this.props.value);
      if (!selected.length) {
        return h("span", {}, "—");
      }
      var options = getOptions(this.props.field);
      var byValue = {};
      options.forEach(function (opt) {
        byValue[String(opt.value)] = opt;
      });
      return h(
        "div",
        { className: "sv-icon-multiselect-preview" },
        selected.map(function (value) {
          var opt = byValue[String(value)];
          var src = opt
            ? opt.image
            : String(value).indexOf("/") === 0
              ? String(value)
              : "/assets/img/ui/" + String(value) + ".png";
          return h("img", {
            key: String(value),
            src: src,
            alt: opt ? opt.label : String(value),
            title: opt ? opt.label : String(value),
          });
        })
      );
    },
  });

  CMS.registerWidget(
    "icon-multiselect",
    IconMultiselectControl,
    IconMultiselectPreview
  );
})();
