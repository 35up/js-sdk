# 35up Javascript SDK

This typescript library is a wrapper around 35up API for sellers that can be 
used as a convenience tool.
It has the following features:
1. Provides with methods for dealing with recommendations, products and orders
2. It performs data validation that ensures integrity of the output data
3. Provides typescript types for inputs and outputs. 

There are 3 packages in the repository:
- [Browser](packages/browser/README.md). To be used on the frontend.
- [Node](packages/node/README.md). To be used on the server.
- Base. Internal, you don't need to use it.

In short, `Node` package has all the same functionality as browser plus extra 
method to create an order. You cannot create a 35up order from browser because
this method requires credentials, and credentials should never be present on
the client side.

