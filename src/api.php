<?php

# Podria haber echo todo en JS? si. Pero es una materia de PHP y esta api es una excusa para entregar un PHP
# Los HTTP Code no son los standares, simplemente es un ejemplo para debug :)
# La idea de hacer AJAX salio en clase, espero sea bien recibida ya que me costo mucho

# Para mantener un codigo limpio, basado en los princios de "clean code", opte por no comentar mi codigo;
# usar variables descriptivas y confiar en lo claro de mi escritura.

try {
    $data = json_decode($_POST["rows"]);
} catch (\Throwable $th) {
    http_response_code(402);
    return false;
}

$summation = 0;

for ($i=0; $i < count($data); $i++) {
    if(isset($data[$i])) {
        if(!empty($data[$i]->price )) {
            $data[$i]->total = $data[$i]->quantity * $data[$i]->price;
            $summation += $data[$i]->total;
        }
    }
}

$tax_list = [
    "1" => ["name" => "CABA", "tax" => 10],
    "2" => ["name" => "Bs. As.", "tax" => 20]
];

$taxes = $tax_list[$_POST["taxes"]];

echo json_encode([
    "name" => $_POST["name"],
    "date" => $_POST["date"],
    "rows" => $data,
    "city" => $taxes["name"],
    "tax" => $taxes["tax"],
    "subtotal" => $summation,
]);
return true;

?>