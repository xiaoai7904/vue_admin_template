export default {
  name: 'pageTableTool',

  props: {
    options: Array
  },

  render(h) {
    return (
      <ul class="page-table-tool">
        {this.options.map((item, index) => {
          if (item.permission) return null;
          return (
            <li key={index} onClick={() => item.click()}>
              {item.name}
            </li>
          );
        })}
      </ul>
    );
  }
};
