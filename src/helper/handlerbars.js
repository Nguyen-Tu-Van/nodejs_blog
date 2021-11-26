module.exports = {
    sum: (a, b) => a + b,
    sortable: (name, _sort) => {
        const sortType = name == _sort.column ? _sort.type : 'default';
        const icons = {
            default: '<i class="fas fa-sort"></i>',
            asc: '<i class="fas fa-sort-amount-down"></i>',
            desc: '<i class="fas fa-sort-amount-down-alt"></i>',
        };
        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        };
        let type = types[sortType];
        let icon = icons[sortType];
        if (type === undefined || icon === undefined) {
            type = types['default'];
            icon = icons['default'];
        }
        return `<a href="?_sort&column=${name}&type=${type}">${icon}</a`;
    },
};
