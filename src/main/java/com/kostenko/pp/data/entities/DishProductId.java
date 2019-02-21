package com.kostenko.pp.data.entities;

import com.google.common.base.Objects;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Embeddable
public class DishProductId implements Serializable {
    @Column(name = "dish_id")
    private Long dishId;
    @Column(name = "product_id")
    private Long productId;

    @Override
    public int hashCode() {
        return Objects.hashCode(dishId, productId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DishProductId that = (DishProductId) o;
        return Objects.equal(dishId, that.dishId) &&
                Objects.equal(productId, that.productId);
    }
}
