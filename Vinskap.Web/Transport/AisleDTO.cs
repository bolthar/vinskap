using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Vinskap.Domain.Cellar;

namespace Vinskap.Web.Transport
{
    public class AisleDTO
    {
        public string Name { get; set; }
        public int Rows { get; set; }
        public int Columns { get; set; }

        public static AisleDTO From(Aisle aisle)
        {
            var dto = new AisleDTO();
            dto.Name = aisle.Name;
            dto.Rows = aisle.Rows;
            dto.Columns = aisle.Columns;
            return dto;
        }
    }
}