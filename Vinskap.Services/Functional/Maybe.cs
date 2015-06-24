using Vinskap.Services;
using Vinskap.Services.Commands;
using Vinskap.Services.Commands.Vaildation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Functional
{
    public static class MaybeExtensions
    {
        public static Maybe<T> ToMaybe<T>(this T value)
        {
            if (EqualityComparer<T>.Default.Equals(value, default(T)))
            {
                return new Nothing<T>();
            }

            return new Just<T>(value);
        }

        public static Maybe<U> Bind<T, U>(this Maybe<T> value, Func<T, Maybe<U>> transform)
        {
            var justT = value as Just<T>;
            if (justT == null)
                return new Nothing<U>();

            return transform(justT.Value);
        }

        public static void Bind<T>(this Maybe<T> value, Action<T> tail)
        {
            var justT = value as Just<T>;
            if (justT == null)
                return;

            tail(justT.Value);
        }
    }

    public interface Maybe<T>
    {
    }

    public class Nothing<T> : Maybe<T>
    {
    }

    public class Just<T> : Maybe<T>
    {
        public T Value { get; private set; }

        public Just(T value)
        {
            Value = value;
        }
    }
}
