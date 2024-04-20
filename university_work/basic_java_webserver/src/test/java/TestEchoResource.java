import com.example.lab2.EchoResource;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class TestEchoResource {

    private final EchoResource subject = new EchoResource();

    @Test
    public void testMain() {

        assertFalse(subject.main().isEmpty());
    }

    @Test
    public void testUnary() {
        // setup
        String flag = "AAAAAA";

        assertFalse(subject.unary(flag).isEmpty());
        assertTrue(subject.unary(flag).contains(flag));
    }

    @Test
    public void testBinary() {
        // setup
        String flag1 = "BBBBBB";
        String flag2 = "CCCCCC";

        assertFalse(subject.binary(flag1, flag2).isEmpty());
        assertTrue(subject.binary(flag1, flag2).contains(flag1));
        assertTrue(subject.binary(flag1, flag2).contains(flag2));
    }
}
