using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MockDataSourceConnection
{
    public class DataFactory
    {
        Random rnd = new Random();

        public async Task<object> GetData(object paras)
        {
            return rnd.Next(0, 100);
        }

    }
}
