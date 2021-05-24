const form = document.getElementById("filter-order");
const selectOrder = form.elements.order;

selectOrder.addEventListener('change', function(e) {
    form.submit();
})