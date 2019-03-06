package com.kostenko.pp.data.mappings;

import com.google.common.base.Objects;
import com.kostenko.pp.data.Constants;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

import static java.util.Objects.isNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Embeddable
public class DishProductId implements Serializable {
    @Column(name = Constants.Dish.ID)
    private Long dishId;
    @Column(name = Constants.Product.ID)
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
        if (isNull(o) || getClass() != o.getClass()) {
            return false;
        }
        DishProductId that = (DishProductId) o;
        return Objects.equal(dishId, that.dishId) &&
                Objects.equal(productId, that.productId);
    }
}
