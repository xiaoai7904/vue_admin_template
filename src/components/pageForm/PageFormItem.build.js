export const buildFormItem = (h, config, _this) => {
    const buildFormItemJsx = {
      input: h => {
        return (
          <div>  
          <Input
            class="page-form-input"
            element-id={'pageFromInput' + config.id}
            value={_this.model[config.id]}
            type={config.options.type || 'text'}
            size={config.options.size}
            readonly={config.options.readonly}
            disabled={config.options.disabled}
            clearable={config.options.clearable !== undefined ? config.options.clearable : true}
            placeholder={config.options.placeholder || '请输入内容'}
            style={config.options.style}
            icon={config.options.icon}
            search={config.options.search}
            onOn-blur={$event => {
              _this.$set(_this.model, config.id, $event.target.value);
              _this.$emit('changeConfig', { id: config.id, value: $event.target.value });
            }}
            on-input={value => {
              _this.$set(_this.model, config.id, value);
              _this.$emit('changeConfig', { id: config.id, value: value });
            }}
            onOn-keyup={$event => {
              if($event.keyCode === 13) {
                _this.search()
              }
            }}
          >
            {config.options.append && config.options.append(h, config, _this)}
          </Input>
          {config.options.customRender && config.options.customRender(h, _this.model[config.id])}
          </div>
        );
      },
      select: h => {
        return (
          <Select
            value={_this.model[config.id]}
            placeholder={config.options.placeholder || '请选择下拉数据'}
            size={config.options.size}
            filterable={config.options.filterable}
            multiple={config.options.multiple}
            clearable={config.options.clearable}
            disabled={config.options.disabled}
            style={config.options.style}
            transfer={true}
            onOn-change={value => {
              _this.$set(_this.model, config.id, value);
              _this.$emit('changeConfig', { id: config.id, value: value });
            }}
          >
            {config.options.list.map(listItem => {
              return (
                <Option value={listItem.value} key={listItem.value} disabled={listItem.disabled ? true : false}>
                  {listItem.label}
                </Option>
              );
            })}
          </Select>
        );
      },
      cascader: h => {
        return (
          <Cascader
            value={_this.model[config.id]}
            data={config.options.data}
            placeholder={config.options.placeholder || '请选择下拉数据'}
            size={config.options.size}
            clearable={config.options.clearable}
            disabled={config.options.disabled}
            onOn-change={value => {
              _this.$set(_this.model, config.id, value);
              _this.$emit('changeConfig', { id: config.id, value: value });
            }}
          ></Cascader>
        );
      },
      button: h => {
        return (
          <Button
            type={config.options.type || 'primary'}
            size={config.options.size}
            icon={config.options.icon}
            long={config.options.long}
            loading={_this.btnLoading[config.id]}
            on-click={() => {
              _this.$set(_this.btnLoading, config.id, true);
              try {
                config.options.click(config).then(data => {
                  _this.$set(_this.btnLoading, config.id, false);
                });
              } catch (error) {
                throw new Error('事件回调必须返回一个Promise对象');
              }
            }}
          >
            {config.name}
          </Button>
        );
      },
      datePicker: h => {
        return (
          <DatePicker
            type={config.options.type || 'daterange'}
            clearable={config.options.clearable}
            disabled={config.options.disabled}
            size={config.options.size}
            confirm={config.options.confirm}
            format={config.options.format}
            split-panels={config.options.splitPanels}
            placeholder={config.options.placeholder || '请选择日期'}
            style={config.options.style}
            value={_this.model[config.id]}
            transfer={config.options.transfer || true}
            options={config.options.exts}
            onOn-change={date => {
              _this.$set(_this.model, config.id, date);
              _this.$emit('changeConfig', { id: config.id, value: date });
            }}
          />
        );
      },
      switch: h => {
        return (
          <i-switch
            value={_this.model[config.id]}
            disabled={config.options.disabled}
            size={config.options.size || 'large'}
            true-color={config.options.trueColor}
            false-color={config.options.falseColor}
            onOn-change={value => {
              _this.$set(_this.model, config.id, value);
              _this.$emit('changeConfig', { id: config.id, value });
            }}
          >
            <span slot="open">{config.options.openLable || '开启'}</span>
            <span slot="close">{config.options.closeLable || '关闭'}</span>
          </i-switch>
        );
      },
      radio: h => {
        return (
          <RadioGroup
            value={_this.model[config.id]}
            onOn-change={value => {
              _this.$set(_this.model, config.id, value + '');
              _this.$emit('changeConfig', { id: config.id, value: value + '' });
            }}
          >
            {config.options.list.map(item => {
              if(item.customRender) {
                return (
                  <Radio label={item.id + ''} key={item.id} disabled={item.disabled}>
                    {item.customRender(h, item, _this)}
                  </Radio>
                );
              }
              return (
                <Radio label={item.id + ''} key={item.id} disabled={item.disabled}>
                  {item.name}
                </Radio>
              );
            })}
          </RadioGroup>
        );
      },
      editor: h => {
        return (
          <PageEditorView
            value={_this.model[config.id]}
            on-change={value => {
              _this.$set(_this.model, config.id, value.html);
              _this.$emit('changeConfig', { id: config.id, value: value.html, textVal: value.text });
            }}
          />
        );
      },
      slider: h => {
        return (
            <Slider
                value={+_this.model[config.id]}
                max={config.options.max}
                min={config.options.min}
                show-input
                on-input={value => {
                    _this.$set(_this.model, config.id, value);
                    _this.$emit("changeConfig", {
                        id: config.id,
                        value: value
                    });
                }}
            ></Slider>
        );
    },
      customRender: h => {
        return config.customRender(h, _this.model[config.id], _this);
      }
    };
  
    return buildFormItemJsx[config.type](h);
  };
  