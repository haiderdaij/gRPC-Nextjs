import React from "react";

const ProductPageId = ({ params }: { params: { id: string } }) => {
  return <div>ProductPageId: {params.id}</div>;
};

export default ProductPageId;
