using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.WPF
{
    public static class PropertyChangedExtensions
    {
        public static void Notify<T>(this PropertyChangedEventHandler handler, Expression<Func<T>> selector)
        {
            if (handler == null) return;
            var memberExpression = selector.Body as MemberExpression;
            if (memberExpression == null) return;
            var sender = ((ConstantExpression)memberExpression.Expression).Value;
            handler(sender, new PropertyChangedEventArgs(memberExpression.Member.Name));
        }
    }
}
