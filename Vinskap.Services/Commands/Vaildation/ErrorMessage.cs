using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Services.Commands
{
    public class ErrorMessage
    {
        public string Field { get; private set; }
        public string Message { get; private set; }

        public ErrorMessage(string field, string message)
        {
            Field = field;
            Message = message;
        }
    }
}
