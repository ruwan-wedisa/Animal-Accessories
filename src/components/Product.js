import React, { Component } from "react";
import Counter from "./Counter";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {},
      quickViewProduct: {},
      isAddedCarton: false,
      isAddedSingle:false
    };
  }
  
  addToCartCarton(image, name, price, id, quantity) {
    this.setState(
      {
        selectedProduct: {
          image: image,
          name: name,
          price: price,
          id: id,
          quantity: quantity
        }
      },
      function() {
        this.props.addToCartCarton(this.state.selectedProduct);
      }
    );
    this.setState(
      {
        isAddedCarton: true
      },
      function() {
        setTimeout(() => {
          this.setState({
            isAddedCarton: false,
            selectedProduct: {}
          });
        }, 3500);
      }
    );
  }

  addToCartSingle(image, name, price, id, quantity) {
    this.setState(
      {
        selectedProduct: {
          image: image,
          name: name,
          price: price,
          id: id,
          quantity: quantity
        }
      },
      function() {
        this.props.addToCartSingle(this.state.selectedProduct);
      }
    );
    this.setState(
      {
        isAddedSingle: true
      },
      function() {
        setTimeout(() => {
          this.setState({
            isAddedSingle: false,
            selectedProduct: {}
          });
        }, 3500);
      }
    );
  }

  quickView(image, name, price, id) {
    this.setState(
      {
        quickViewProduct: {
          image: image,
          name: name,
          price: price,
          id: id
        }
      },
      function() {
        this.props.openModal(this.state.quickViewProduct);
      }
    );
  }
  render() {
    let image = this.props.image;
    let name = this.props.name;
    let price = this.props.price;
    let id = this.props.id;
    let quantity = this.props.productQuantity;
    return (
      <div className="product">
        <h4 className="product-name">{this.props.name}</h4>
        <div className="product-image">
          <img
            src={image}
            alt={this.props.name}
            onClick={this.quickView.bind(
              this,
              image,
              name,
              price,
              id,
              quantity
            )}
          />
        </div>

        <p className="product-price">Price : {this.props.price}</p>
        <div className ="number-of-units">Units in Carton : 20</div>
        <div className = "container">
        
            <div className = "item-with-details">
        <Counter
          productQuantity={quantity}
          updateQuantity={this.props.updateQuantity}
          resetQuantity={this.resetQuantity}
        />
              <div className="sale-count-label">Carton Amount</div>
              <div className="product-action">
                <button
                  className={!this.state.isAddedCarton ? "" : "added"}
                  type="button"
                  onClick={this.addToCartCarton.bind(
                    this,
                    image,
                    name,
                    price,
                    id,
                    quantity
                  )}
                >
                  {!this.state.isAddedCarton ? "ADD TO CART" : "✔ ADDED"}
                </button>
                
              </div>
            </div>

            <div className = "item-with-details-1">
        <Counter
          productQuantity={quantity}
          updateQuantity={this.props.updateQuantity}
          resetQuantity={this.resetQuantity}
        />
              <div className ="sale-count-label">Single Amount</div>
              <div className="product-action">
                <button
                  className={!this.state.isAddedSingle ? "" : "added"}
                  type="button"
                  onClick={this.addToCartSingle.bind(
                    this,
                    image,
                    name,
                    price,
                    id,
                    quantity
                  )}
                >
                  {!this.state.isAddedSingle ? "ADD TO CART" : "✔ ADDED"}
                </button>
              </div>
            </div>
          </div>
          <div className ="rule-set"><strong>Conditions: </strong><dl><dt>If you purchase single units, the price is acquired using the carton price multiplied by an increase of
30%</dt><dt>
If you purchase 3 cartons or more, you will receive a 10% discount off the carton price
</dt>
</dl>
        </div>
        </div>
    );
  }
}

export default Product;
