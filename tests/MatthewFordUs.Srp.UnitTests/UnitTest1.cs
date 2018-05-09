using System;
using System.Diagnostics;
using System.Security.Cryptography;
using FluentAssertions;
using Xunit;

namespace MatthewFordUs.Srp.UnitTests
{
  public class SrpTests
  {
    static readonly string expected_k = ("7556AA04 5AEF2CDD 07ABAF0F 665C3E81 8913186F").Replace(" ", "");
    static readonly string expected_x = ("94B7555A ABE9127C C58CCF49 93DB6CF8 4D16C124").Replace(" ", "");

    static readonly string expected_v =
      ("7E273DE8 696FFC4F 4E337D05 B4B375BE B0DDE156 9E8FA00A 9886D812" +
       "9BADA1F1 822223CA 1A605B53 0E379BA4 729FDC59 F105B478 7E5186F5" +
       "C671085A 1447B52A 48CF1970 B4FB6F84 00BBF4CE BFBB1681 52E08AB5" +
       "EA53D15C 1AFF87B2 B9DA6E04 E058AD51 CC72BFC9 033B564E 26480D78" +
       "E955A5E2 9E7AB245 DB2BE315 E2099AFB").Replace(" ", "");

    static readonly string expectedA =
      ("61D5E490 F6F1B795 47B0704C 436F523D D0E560F0 C64115BB 72557EC4" +
       "4352E890 3211C046 92272D8B 2D1A5358 A2CF1B6E 0BFCF99F 921530EC" +
       "8E393561 79EAE45E 42BA92AE ACED8251 71E1E8B9 AF6D9C03 E1327F44" +
       "BE087EF0 6530E69F 66615261 EEF54073 CA11CF58 58F0EDFD FE15EFEA" +
       "B349EF5D 76988A36 72FAC47B 0769447B").Replace(" ", "");

    static readonly string expectedB =
      ("BD0C6151 2C692C0C B6D041FA 01BB152D 4916A1E7 7AF46AE1 05393011" +
       "BAF38964 DC46A067 0DD125B9 5A981652 236F99D9 B681CBF8 7837EC99" +
       "6C6DA044 53728610 D0C6DDB5 8B318885 D7D82C7F 8DEB75CE 7BD4FBAA" +
       "37089E6F 9C6059F3 88838E7A 00030B33 1EB76840 910440B1 B27AAEAE" +
       "EB4012B7 D7665238 A8E3FB00 4B117B58").Replace(" ", "");

    static readonly string expectedS =
      ("B0DC82BA BCF30674 AE450C02 87745E79 90A3381F 63B387AA F271A10D" +
       "233861E3 59B48220 F7C4693C 9AE12B0A 6F67809F 0876E2D0 13800D6C" +
       "41BB59B6 D5979B5C 00A172B4 A2A5903A 0BDCAF8A 709585EB 2AFAFA8F" +
       "3499B200 210DCC1F 10EB3394 3CD67FC8 8A2F39A4 BE5BEC4E C0A3212D" +
       "C346D7E4 74B29EDE 8A469FFE CA686E5A").Replace(" ", "");

    static readonly string expectedU = ("CE38B959 3487DA98 554ED47D 70A7AE5F 462EF019").Replace(" ", "");

    [Fact]
    public void TestRfc5054TestVectors() {
      // Test RFC 5054 vectors

      const string i = "alice";
      const string password = "password123";
      var s = StringToByteArray("BEB25379 D1A8581E B5A72767 3A2441EE");
      var a = StringToByteArray("60975527 035CF2AD 1989806F 0407210B C81EDC04 E2762A56 AFD529DD DA2D4393");
      var b = StringToByteArray("E487CB59 D31AC550 471E81F0 0F6928E0 1DDA08E9 74A004F4 9E61F5D1 05284D20");

      var hashAlgorithm = SHA1.Create();
      var groupParameter = Srp.Group1024;
      var client = new SRPClient(groupParameter, hashAlgorithm);
      var A = client.ComputeA(a.ToBigInteger());
      var server = new SRPServer(groupParameter, hashAlgorithm);
      var k = server.Compute_k();
      var x = server.Compute_x(s, i, password);
      var v = server.Compute_v(x.ToBigInteger());
      var B = server.ComputeB(v, k.ToBigInteger(), b.ToBigInteger());
      var u = client.Compute_u(A, B.ToBytes());
      var clientS = client.ComputeS(B, k.ToBigInteger(), u.ToBigInteger(), a.ToBigInteger(), x.ToBigInteger());
      var serverS = server.ComputeS(A.ToBigInteger(), v, u.ToBigInteger(), b.ToBigInteger());
      var clientK = client.ComputeK(clientS.ToBytes());
      var serverK = server.ComputeK(serverS.ToBytes());
      var clientM1 = client.Compute_M1(i, s, A, B.ToBytes(), clientK);
      var serverM1 = server.Compute_M1(i, s, A, B.ToBytes(), serverK);
      var serverM2 = server.ComputeM2(A, serverM1, serverK);
      var clientM2 = client.ComputeM2(A, clientM1, clientK);


      ByteArrayToString(A).Should().BeEquivalentTo(expectedA);
      ByteArrayToString(k).Should().BeEquivalentTo(expected_k);
      ByteArrayToString(x).Should().BeEquivalentTo(expected_x);
      ByteArrayToString(v.ToBytes()).Should().BeEquivalentTo(expected_v);
      ByteArrayToString(B.ToBytes()).Should().BeEquivalentTo(expectedB);
      ByteArrayToString(u).Should().BeEquivalentTo(expectedU);
      ByteArrayToString(clientS.ToBytes()).Should().BeEquivalentTo(expectedS);
      ByteArrayToString(serverS.ToBytes()).Should().BeEquivalentTo(expectedS);
      clientK.Should().BeEquivalentTo(serverK);
      clientM1.Should().BeEquivalentTo(serverM1);
      serverM2.Should().BeEquivalentTo(clientM2);
    }

    private static string ByteArrayToString(byte[] ba)
    {
      return BitConverter.ToString(ba).Replace("-", "");
    }

    private static byte[] StringToByteArray(string hex)
    {
      hex = hex.Replace(" ", "");
      var NumberChars = hex.Length;
      var bytes = new byte[NumberChars / 2];
      for (var i = 0; i < NumberChars; i += 2)
        bytes[i / 2] = Convert.ToByte(hex.Substring(i, 2), 16);
      return bytes;
    }
  }
}
