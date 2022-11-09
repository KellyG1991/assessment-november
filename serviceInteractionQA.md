# Imagine that we have two services - ServiceA and ServiceB. Both services have to communicate with each other in some way

## Given this information, please answer following questions

1. What options do we have to establish such communication?

2. For each option describe what are the pros and cons of this solution?

3. For each option describe what are the cases the solution fits best?

## Answers

1. Http/Https Communication, Message Communication, Event-driven communication

2. Pros and Cons

   - Http/Https Communication

     - Cons:

       - It creates coupling between services

       - It creates many http/https requests

       - It involves a lot of complexity

     - Pros:

       - It offers lower CPU and Memory usage

       - Handshaking is done at the initial connection establishment stage.

   - Message Communication

     - Cons:

       - Difficulty in troubleshooting

       - Lack of verbose errors

       - Limited message size

     - Pros:

       - It eliminates a lot of complexity associated with Http/Https communication.

       - It does not require any service to know how to talk to one another

       - It enables flexibility to choose which messages/data they need

   - Event-driven communication

     - Cons:

       - Events are generic

     - Pros:

       - Events are loosley coupled

       - Each service reacts only when the event they have subscribed to occurs

       - It eliminates complexity

       - Services dont necessarily need a common message structure

3. Cases

   - Http/Https Communication.

     - Signup - Email Notification. ServiceA registers a user and then calls ServiceB to send an email notification (verify email or a code to login) upon successful registration.

     - User Payment Verifications. ServiceA verifies payment and calls ServiceB to write some database logic i.e paymentVerified: true, paymentId: ServiceA.paymentId

   - Message Communication.

     - Download of data. ServiceA sends a download request to a broker i.e AWS SNS, the broker calls ServiceB responsible for handling download requests, and downloads files requested.

   - Event-driven communication

     - Chat System. ServiceA subscribes to a messageId from ServiceB. When ServiceB publishes to the messageId, ServiceA recieves it.
