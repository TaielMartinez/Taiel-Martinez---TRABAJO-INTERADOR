const debug = true

$(document).ready(function () {
    $("#view-data").hide()
    $(".add-new-row").click(() => {
        var number = $('.input-list-row').length
        $(".inputs-list").append(`
            <tr class="input-list-row" id="inputs-row-${number}">
                <td><input type="number" class="form-control" name="code"></td>
                <td><input type="text" class="form-control" name="description"></td>
                <td><input type="number" class="form-control" name="quantity"></td>
                <td><input type="number" class="form-control" name="price"></td>
            </tr>
        `)
    })

    $(".remove-row").click(() => {
        var number = $('.input-list-row').length - 1
        $(`#inputs-row-${number}`).remove()
    })

    $(".new-back").click(() => {
        $("#view-data").hide()
        $(".inputs-list").html(`
            <tr class="input-list-row" id="inputs-row-0">
                <td><input type="number" class="form-control" name="code"></td>
                <td><input type="text" class="form-control" name="description"></td>
                <td><input type="number" class="form-control" name="quantity"></td>
                <td><input type="number" class="form-control" name="price"></td>
            </tr>
        `)
        $("#load-data").show()
    })

    $(".edit-back").click(() => {
        $("#view-data").hide()
        $("#load-data").show()
    })

    $(".send").click(() => {
        $("#load-data").hide()
        const rows_count = $('.input-list-row').length
        var rows = []
        for (let i = 0; i < rows_count; i++) {
            rows.push({
                code: $(`#inputs-row-${i} [name="code"]`).val(),
                description: $(`#inputs-row-${i} [name="description"]`).val(),
                quantity: parseInt($(`#inputs-row-${i} [name="quantity"]`).val()),
                price: parseInt($(`#inputs-row-${i} [name="price"]`).val()),
            })
        }

        const data = {
            rows: JSON.stringify(rows),
            date: $(`[name="date"]`).val(),
            name: $(`[name="name"]`).val(),
            taxes: $(`[name="taxes"] option:selected`).val()
        }

        if (debug) console.log(data);
        $.ajax({
            type: "POST",
            url: "./src/api.php",
            data: data,
            success: (res) => {
                try {
                    var res = JSON.parse(res)
                } catch (error) {
                    var res = res;
                }
                if (debug) console.log(res)

                $("#view-name").text(res.name)
                $("#view-date").text(res.date)
                $("#view-city").text(res.city)
                $("#view-tax").text(res.tax)

                $(".view-table").html('')
                res.rows.forEach(row => {
                    $(".view-table").append(`
                        <tr>
                            <td>${row.code}</td>
                            <td>${row.description}</td>
                            <td>${row.quantity}</td>
                            <td>$${row.price}</td>
                            <td>$${row.total}</td>
                        </tr>
                    `)
                });

                $("#view-subtotal").text(res.subtotal)
                $("#view-total-tax").text(res.subtotal * (res.tax / 100))
                $("#view-total").text(res.subtotal + res.subtotal * (res.tax / 100))
                $("#view-data").show()
            },
            error: (err) => {
                console.error(err)
            }
        })
    })
})
