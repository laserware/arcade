// noinspection GrazieInspection

/*
 * MIT License
 *
 * Copyright (c) 2022 Jonas "DerZade" Schade
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Most of this code was taken from the [typescript-event-target](https://github.com/DerZade/typescript-event-target)
 * package.
 */

/* istanbul ignore file -- @preserve: Since this is vendored, we're skipping tests. */

/**
 * A function that can be passed to the `listener` parameter of
 * {@linkcode TypedEventTarget.addEventListener} and {@linkcode TypedEventTarget.removeEventListener}.
 *
 * @template M A map of event types to their respective Event classes.
 * @template T The event type to listen for (has to be keyof `M`).
 *
 * @category Events
 */
export type TypedEventListener<M, T extends keyof M> = (event: M[T]) => void;

/**
 * An object that can be passed to the `listener` parameter of
 * {@linkcode TypedEventTarget.addEventListener} and {@linkcode TypedEventTarget.removeEventListener}.
 *
 * @template M A map of event types to their respective Event classes.
 * @template T The event type to listen for (has to be keyof `M`).
 *
 * @category Events
 */
export interface TypedEventListenerObject<M, T extends keyof M> {
  handleEvent(object: M[T]): void;
}

/**
 * Type of parameter `listener` in {@linkcode TypedEventTarget.addEventListener}
 * and {@linkcode TypedEventTarget.removeEventListener}.
 *
 * The object that receives a notification (an object that implements the Event
 * interface) when an event of the specified type occurs.
 *
 * Can be either an object with a handleEvent() method, or a JavaScript function.
 *
 * @template M A map of event types to their respective Event classes.
 * @template T The event type to listen for (has to be keyof `M`).
 *
 * @category Events
 */
export type TypedEventListenerOrEventListenerObject<M, T extends keyof M> =
  | TypedEventListener<M, T>
  | TypedEventListenerObject<M, T>;

/**
 * Used to add type safety to event listeners on a class that extends `EventTarget`.
 * See the example below for additional details.
 *
 * @template M A map of event types to their respective event classes.
 *
 * @example
 * // Create an "event map" with the key equal to the name of the
 * // dispatched event and the value equal to the event type:
 * type MyTypedEventMap = {
 *   "open": CustomEvent<string>;
 *   "close": CustomEvent<string>;
 * }
 *
 * // Then, extend `TypedEventTarget` and pass in the event map type
 * // to the generic:
 * export class MyClass extends TypedEventTarget<MyTypedEventMap> {
 *   public dispatchOpen(): void {
 *     this.dispatchEvent("open", { detail: "Hello!" });
 *   }
 *
 *   public dispatchClose(): void {
 *     this.dispatchEvent("close", { detail: "Goodbye!" });
 *   }
 * }
 *
 * // When you create an instance of the class, you get autocomplete/type
 * // safety in event listeners:
 * const myInstance = new MyClass();
 *
 * myInstance.addEventListener("open", (event) => {
 *   console.log(event.detail); // <- "Hello!"
 * });
 *
 * myInstance.addEventListener("close", (event) => {
 *   console.log(event.detail); // <- "Goodbye!"
 *
 *   // This is a type error, this was typed as a string in MyTypedEventMap!
 *   const someNumber: number = event.detail;
 * });
 *
 * // This is a type error, the event doesn't exist in MyTypedEventMap!
 * myInstance.addEventListener("yeet", (event) => {
 *   // ...
 * });
 *
 * myInstance.dispatchOpen();
 *
 * @category Events
 *
 * @class
 */
export class TypedEventTarget<
  M extends Record<string, Event | CustomEvent>,
> extends EventTarget {
  /**
   * Dispatches a synthetic `event` to the target and returns `true` if either
   * event's cancelable attribute value is `false` or its `preventDefault()` method
   * was not invoked, and `false` otherwise.
   *
   * @template T Type of event to dispatch.
   *
   * @deprecated To ensure type safety use {@linkcode dispatchTypedEvent} instead.
   */
  // @ts-ignore
  public dispatchEvent<T extends keyof M>(event: M[T]): boolean {
    return super.dispatchEvent(event as Event);
  }

  /**
   * Appends an event listener for events whose type attribute value is `type`.
   * The `callback` argument sets the callback that will be invoked when the event
   * is dispatched.
   *
   * The `options` argument sets listener-specific options. For compatibility this
   * can be a boolean, in which case the method behaves exactly as if the value
   * was specified as `options.capture`.
   *
   * When set to `true`, `options.capture` prevents `callback` from being invoked
   * when the event's `eventPhase` attribute value is `BUBBLING_PHASE`. When `false`
   * (or not present), `callback` will not be invoked when event's `eventPhase`
   * attribute value is `CAPTURING_PHASE`. Either way, `callback` will be invoked if
   * event's `eventPhase` attribute value is `AT_TARGET`.
   *
   * When set to `true`, `options.passive` indicates that the `callback` will not
   * cancel the event by invoking `preventDefault()`. This is used to enable
   * performance optimizations described in [§ 2.8 Observing event listeners](https://dom.spec.whatwg.org/#observing-event-listeners).
   *
   * When set to `true`, `options.once` indicates that the `callback` will only be
   * invoked once after which the event listener will be removed.
   *
   * The event listener is appended to target's event listener list and is not
   * appended if it has the same `type`, `callback`, and `capture`.
   *
   * @template T Event type to add event listener for.
   *
   * @param type Name of the event to associated with listener.
   * @param callback Callback to fire with the event fires.
   * @param options Options for creating the event listener.
   */
  public addEventListener<T extends keyof M & string>(
    type: T,
    callback: TypedEventListenerOrEventListenerObject<M, T> | null,
    options?: boolean | AddEventListenerOptions,
  ): void {
    super.addEventListener(
      type as string,
      callback as EventListenerOrEventListenerObject,
      options,
    );
  }

  /**
   * Removes the event listener in target's event listener list with the same
   * `type`, `callback`, and `options`.
   *
   * @template T Event type to add event listener for.
   */
  public removeEventListener<T extends keyof M & string>(
    type: T,
    callback: TypedEventListenerOrEventListenerObject<M, T> | null,
    options?: boolean | AddEventListenerOptions,
  ): void {
    super.removeEventListener(
      type as string,
      callback as EventListenerOrEventListenerObject,
      options,
    );
  }

  /**
   * Dispatches a synthetic event to `target` and returns true if either
   * event's cancelable attribute value is false or its `preventDefault()` method
   * was not invoked, and false otherwise.
   *
   * @template T Event type to dispatch.
   *
   * @param type Type of the event (i.e. key from the event map).
   * @param event Event or CustomEvent to dispatch.
   */
  public dispatchTypedEvent<T extends keyof M>(type: T, event: M[T]): boolean {
    return super.dispatchEvent(event);
  }
}
